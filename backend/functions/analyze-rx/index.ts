import type { S3Handler } from "aws-lambda";

export const handler: S3Handler = async (event) => {
  console.log(JSON.stringify({ stage: "analyze-rx", outcome: "stub", recordCount: event.Records.length }));
};

