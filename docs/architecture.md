# Architecture

RXCLEAR receives a prescription image through a browser, stores it temporarily in a private S3 bucket, then uses an S3 event to begin analysis. The API returns a submission identifier immediately; later stages will poll the API for the stored analysis result. The application resources are designed for `ap-south-1`; Bedrock is separately configured through `BEDROCK_REGION` because availability can differ by model.

```mermaid
flowchart LR
  U[Browser] -->|POST /upload| API[API Gateway REST API]
  API --> UH[upload-handler Lambda]
  UH --> H[(submission_history)]
  UH -->|presigned POST in Stage 1| S3[(Private S3 uploads)]
  S3 -->|uploads/ object created| AR[analyze-rx Lambda]
  AR --> H
  AR --> DI[(drug_interactions)]
  AR -. Stage 2 onward .-> B[Amazon Bedrock]
  U -->|GET /analysis/{id}| API
  API --> GA[get-analysis Lambda]
  GA --> H
```

## AWS services

**Amazon S3** temporarily holds uploaded prescription images. It is private, encrypted at rest, accepts browser uploads only through presigned POSTs in Stage 1, and expires `uploads/` objects after one day.

**Amazon API Gateway (REST API)** exposes the upload and analysis endpoints to the frontend. It owns browser CORS configuration; the deployed Amplify origin is supplied as a parameter.

**AWS Lambda** keeps the upload, analysis, and status-reading work small and independently permissioned. The functions are bundled from TypeScript with SAM esbuild.

**Amazon DynamoDB** stores a short-lived submission status/history record and the curated interaction table. Both tables use on-demand billing; submission records will expire through a seven-day TTL.

**Amazon Bedrock** will read prescription images and create explanations in later stages. The model identifier is injected as configuration rather than hardcoded, and interaction decisions remain DynamoDB lookups rather than model decisions.

**Amazon CloudWatch** receives the structured Lambda logs used to observe submission stage, duration, and outcome. No image bytes, prescription content, or credentials should be logged.

**AWS Amplify Hosting** will host the frontend after a human connects this repository in the AWS console. It is intentionally not defined by SAM.

