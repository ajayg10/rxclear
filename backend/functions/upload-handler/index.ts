import { randomUUID } from "node:crypto";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import type { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";

const allowedImageTypes = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const;

type AllowedImageType = keyof typeof allowedImageTypes;

const documentClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const s3Client = new S3Client({});

const createResponse = (statusCode: number, body: Record<string, unknown>): APIGatewayProxyResult => ({
  statusCode,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

const isAllowedImageType = (contentType: string): contentType is AllowedImageType =>
  Object.prototype.hasOwnProperty.call(allowedImageTypes, contentType);

export const handler: APIGatewayProxyHandler = async (event) => {
  const startedAt = Date.now();
  let submissionId: string | undefined;

  try {
    const requestBody: unknown = event.body ? JSON.parse(event.body) : null;
    const contentType =
      typeof requestBody === "object" && requestBody !== null && "contentType" in requestBody
        ? (requestBody as { contentType?: unknown }).contentType
        : undefined;

    if (typeof contentType !== "string" || !isAllowedImageType(contentType)) {
      console.log(JSON.stringify({ stage: "upload-handler", durationMs: Date.now() - startedAt, outcome: "invalid_content_type" }));
      return createResponse(400, { message: "Please upload a JPEG, PNG, or WebP image." });
    }

    const tableName = process.env.SUBMISSION_HISTORY_TABLE;
    const bucketName = process.env.UPLOAD_BUCKET;
    if (!tableName || !bucketName) {
      throw new Error("Required upload configuration is unavailable.");
    }

    submissionId = randomUUID();
    const objectKey = `uploads/${submissionId}.${allowedImageTypes[contentType]}`;
    const createdAt = new Date().toISOString();
    const expiresAt = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;

    await documentClient.send(
      new PutCommand({
        TableName: tableName,
        Item: { submissionId, status: "processing", createdAt, expiresAt, s3ObjectKey: objectKey },
      }),
    );

    const upload = await createPresignedPost(s3Client, {
      Bucket: bucketName,
      Key: objectKey,
      Expires: 300,
      Fields: { "Content-Type": contentType },
      Conditions: [
        ["content-length-range", 1024, 5 * 1024 * 1024],
        ["eq", "$Content-Type", contentType],
      ],
    });

    console.log(JSON.stringify({ submissionId, stage: "upload-handler", durationMs: Date.now() - startedAt, outcome: "presigned_post_created" }));
    return createResponse(200, { submissionId, objectKey, upload });
  } catch (error) {
    console.log(JSON.stringify({ submissionId, stage: "upload-handler", durationMs: Date.now() - startedAt, outcome: "error", errorName: error instanceof Error ? error.name : "UnknownError" }));
    return createResponse(500, { message: "We couldn't prepare your upload. Please try again." });
  }
};
