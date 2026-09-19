import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import type { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";

const documentClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const createResponse = (statusCode: number, body: Record<string, unknown>): APIGatewayProxyResult => ({
  statusCode,
  headers: {
    "Access-Control-Allow-Origin": process.env.FRONTEND_ORIGIN ?? "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

export const handler: APIGatewayProxyHandler = async (event) => {
  const startedAt = Date.now();
  const submissionId = event.pathParameters?.submissionId;

  if (!submissionId) {
    return createResponse(400, { message: "Missing submissionId parameter." });
  }

  try {
    const tableName = process.env.SUBMISSION_HISTORY_TABLE;
    if (!tableName) {
      throw new Error("Missing SUBMISSION_HISTORY_TABLE environment variable.");
    }

    const result = await documentClient.send(
      new GetCommand({
        TableName: tableName,
        Key: { submissionId },
      })
    );

    if (!result.Item) {
      console.log(JSON.stringify({ submissionId, stage: "get-analysis", outcome: "not_found", durationMs: Date.now() - startedAt }));
      return createResponse(404, { message: "Prescription submission not found." });
    }

    console.log(JSON.stringify({ submissionId, stage: "get-analysis", outcome: "success", status: result.Item.status, durationMs: Date.now() - startedAt }));
    return createResponse(200, {
      submissionId: result.Item.submissionId,
      status: result.Item.status,
      createdAt: result.Item.createdAt,
      analysis: result.Item.analysis ?? null,
    });
  } catch (error) {
    console.log(
      JSON.stringify({
        submissionId,
        stage: "get-analysis",
        outcome: "error",
        errorName: error instanceof Error ? error.name : "UnknownError",
        durationMs: Date.now() - startedAt,
      })
    );
    return createResponse(500, { message: "Failed to retrieve prescription analysis." });
  }
};
