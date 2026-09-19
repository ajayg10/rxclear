import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import type { S3Handler } from "aws-lambda";
import type { Readable } from "node:stream";

const documentClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const s3Client = new S3Client({});

const generateBuyLinks = (medicineName: string) => {
  const encoded = encodeURIComponent(medicineName);
  return [
    { platform: "Tata 1mg", url: `https://www.1mg.com/search/all?name=${encoded}` },
    { platform: "PharmEasy", url: `https://pharmeasy.in/search/all?name=${encoded}` },
    { platform: "Apollo Pharmacy", url: `https://www.apollopharmacy.in/search-medicines/${encoded}` },
    { platform: "Netmeds", url: `https://www.netmeds.com/catalogsearch/result?q=${encoded}` },
  ];
};

const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
};

export const handler: S3Handler = async (event) => {
  const startedAt = Date.now();
  const tableName = process.env.SUBMISSION_HISTORY_TABLE;
  const modelId = process.env.BEDROCK_MODEL_ID || "global.anthropic.claude-haiku-4-5-20251001-v1:0";
  const bedrockRegion = process.env.BEDROCK_REGION || "ap-south-1";

  const bedrockClient = new BedrockRuntimeClient({ region: bedrockRegion });

  for (const record of event.Records) {
    const bucketName = record.s3.bucket.name;
    const s3Key = record.s3.object.key;
    const match = s3Key.match(/uploads\/([^.]+)\./);
    const submissionId = match ? match[1] : null;

    if (!submissionId || !tableName) {
      console.log(JSON.stringify({ stage: "analyze-rx", outcome: "skipped_invalid_key_or_table", key: s3Key }));
      continue;
    }

    try {
      // 1. Fetch image from S3
      const s3Response = await s3Client.send(
        new GetObjectCommand({ Bucket: bucketName, Key: s3Key })
      );
      if (!s3Response.Body) {
        throw new Error("S3 object body is empty.");
      }

      const imageBuffer = await streamToBuffer(s3Response.Body as Readable);
      const base64Image = imageBuffer.toString("base64");
      const contentType = s3Response.ContentType || "image/jpeg";

      // 2. Call AWS Bedrock with Anthropic Claude Haiku 4.5
      const prompt = `You are a clinical pharmacist and medical OCR specialist deciphering handwritten Indian doctor prescriptions (ENT clinic).

CRITICAL LAYOUT INSTRUCTIONS:
1. MULTI-COLUMN LAYOUT: Prescriptions frequently contain TWO VERTICAL COLUMNS of medications. Look closely:
   - LEFT COLUMN (under the left "Rx" symbol): typically contains 4-6 items (e.g., steam inhalation, tablets/capsules, anti-allergic, anti-inflammatory).
   - RIGHT COLUMN (under the right "Rx" symbol or below ear/vocal sketches): typically contains 4-6 items (e.g., antibiotic tablets like Mahacef, syrups like Mucolite, gargles/fomentation, muscle relaxants, Monticope).
2. EXTRACT ALL ITEMS: Scan BOTH columns thoroughly from top to bottom. You MUST extract EVERY SINGLE prescribed medication, tablet, capsule, syrup, drop, spray, gargle, or treatment into the "medicines" array (med-1, med-2, med-3, ...). Aim to capture all 8-10 items.
3. NEVER STOP EARLY: Do not stop after just 1 medicine or just 1 column.
4. DOSAGE & TIMINGS: For each medicine, extract:
   - Name and strength (e.g. Tab. Mahacef 200mg, Tab. Deflaz 6mg, Cap. Nexpro RD, Syp. Mucolite)
   - Active generic composition
   - Dosage form & frequency (OD = Once daily, BD = Twice daily / 1-0-1, TDS = Thrice daily / 1-1-1 / down arrows ↓ ↓ ↓)
   - Duration (e.g. 5 days / x 5, 7 days)
   - Doctor's handwritten directions & food timings
   - Bioequivalent generic / substitute brand alternatives with approximate price in INR.

Return ONLY valid JSON matching this schema:
{
  "doctorDetails": {
    "name": "Doctor Name (e.g. Dr. G.K. Tandon)",
    "qualification": "Degrees / Specialty",
    "clinic": "Clinic or Hospital name and address",
    "date": "Prescription Date",
    "patientName": "Patient Name & Age if visible (e.g. Mrs Mamta - 60 yr)"
  },
  "safetyNotes": ["Precaution or clinical observation 1", "Precaution 2"],
  "medicines": [
    {
      "id": "med-1",
      "name": "Brand Name & Strength",
      "genericName": "Active Chemical Ingredient",
      "dosage": "Dosage form (e.g. 1 Tab, 2 Drops, 5ml)",
      "frequency": "Frequency in plain English (e.g. Twice daily, Once daily at night)",
      "duration": "Duration (e.g. 5 days, 1 week)",
      "timing": {
        "morning": true,
        "afternoon": false,
        "night": true,
        "timingNote": "Food timing (e.g. After food, Before meals)"
      },
      "doctorInstructions": "Doctor's handwritten directions",
      "purpose": "Clinical indication (ENT / Allergy / Infection / Acidity)",
      "isAvailable": true,
      "alternatives": [
        {
          "id": "alt-1a",
          "name": "Substitute Brand or Generic",
          "type": "Substitute Brand",
          "manufacturer": "Pharma Manufacturer",
          "composition": "Active Composition",
          "priceEstimate": "Estimated Price in INR",
          "description": "Why this is an equivalent alternative"
        }
      ]
    }
  ]
}
Return ONLY pure JSON without markdown backticks or commentary.`;

      const bedrockPayload = {
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 4096,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: contentType.includes("png") ? "image/png" : contentType.includes("webp") ? "image/webp" : "image/jpeg",
                  data: base64Image,
                },
              },
              {
                type: "text",
                text: prompt,
              },
            ],
          },
        ],
      };

      const bedrockResponse = await bedrockClient.send(
        new InvokeModelCommand({
          modelId,
          contentType: "application/json",
          accept: "application/json",
          body: JSON.stringify(bedrockPayload),
        })
      );

      const responseBody = JSON.parse(new TextDecoder().decode(bedrockResponse.body));
      const responseText = responseBody.content?.[0]?.text ?? "";

      // Clean JSON string
      const jsonCleaned = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
      const extractedData = JSON.parse(jsonCleaned);

      // Attach generated pharmacy buy links for each medicine & alternative
      if (extractedData.medicines && Array.isArray(extractedData.medicines)) {
        extractedData.medicines = extractedData.medicines.map((med: any) => ({
          ...med,
          buyLinks: generateBuyLinks(med.name),
          alternatives: Array.isArray(med.alternatives)
            ? med.alternatives.map((alt: any) => ({
                ...alt,
                buyLinks: generateBuyLinks(alt.name),
              }))
            : [],
        }));
      }

      const finalAnalysis = {
        submissionId,
        status: "completed",
        createdAt: new Date().toISOString(),
        ...extractedData,
      };

      // 3. Update DynamoDB
      await documentClient.send(
        new UpdateCommand({
          TableName: tableName,
          Key: { submissionId },
          UpdateExpression: "SET #st = :status, analysis = :analysis",
          ExpressionAttributeNames: { "#st": "status" },
          ExpressionAttributeValues: {
            ":status": "completed",
            ":analysis": finalAnalysis,
          },
        })
      );

      console.log(
        JSON.stringify({
          submissionId,
          stage: "analyze-rx",
          outcome: "bedrock_claude_35_haiku_success",
          durationMs: Date.now() - startedAt,
        })
      );
    } catch (error) {
      console.log(
        JSON.stringify({
          submissionId,
          stage: "analyze-rx",
          outcome: "error",
          errorName: error instanceof Error ? error.name : "UnknownError",
          errorMessage: error instanceof Error ? error.message : String(error),
          durationMs: Date.now() - startedAt,
        })
      );

      // Fallback update to DynamoDB in case Bedrock is unconfigured in current AWS region
      await documentClient.send(
        new UpdateCommand({
          TableName: tableName,
          Key: { submissionId },
          UpdateExpression: "SET #st = :status, analysisError = :err",
          ExpressionAttributeNames: { "#st": "status" },
          ExpressionAttributeValues: {
            ":status": "failed",
            ":err": error instanceof Error ? error.message : "Bedrock execution failed",
          },
        })
      );
    }
  }
};
