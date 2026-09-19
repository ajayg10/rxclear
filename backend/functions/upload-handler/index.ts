import type { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async () => {
  console.log(JSON.stringify({ stage: "upload-handler", outcome: "stub" }));
  return {
    statusCode: 501,
    body: JSON.stringify({ message: "Prescription uploads are not available yet." }),
  };
};

