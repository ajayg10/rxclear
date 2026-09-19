import type { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async () => {
  console.log(JSON.stringify({ stage: "get-analysis", outcome: "stub" }));
  return {
    statusCode: 501,
    body: JSON.stringify({ message: "Prescription analysis is not available yet." }),
  };
};
