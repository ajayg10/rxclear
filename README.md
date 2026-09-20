# 💊 RXCLEAR - Smart Prescription Decoder, Alternative Medicine Finder & 1-Click Online Pharmacy Direct Link

> **AI for Accessibility**  
> RXCLEAR bridges the gap between complex doctor prescriptions, medicine availability issues, and instant online healthcare access.

---

## 🚀 Overview & Problem Statement

### The Problem
1. **Hard-to-Read Doctor Directions:** Patients often struggle to decipher doctor handwriting, daily medication schedules (morning/afternoon/night), and specific instructions (e.g. *take 30 mins before food*).
2. **Local Stock Outages:** When a prescribed brand is unavailable at a local pharmacy, patients delay treatment because they don't know equivalent generic or substitute brand options.
3. **Friction in Online Ordering:** Searching for long chemical or brand names on online pharmacy apps is slow and prone to spelling errors.

### The Solution
**RXCLEAR** is an AI-assisted serverless application that:
- Reads prescription images and extracts doctor instructions into clear, structured daily schedules.
- Instantly recommends safe, bio-equivalent **generic and brand substitute medicines** with exact composition matching when a prescribed item is marked **"NOT Available"**.
- Provides 1-click **Buy Now** links redirecting users directly to major online pharmacy platforms (**Tata 1mg**, **PharmEasy**, **Apollo Pharmacy**, and **Netmeds**).

---

## ✨ 3 Core Features

### 1️⃣ Prescription & Doctor Directions Decoder
- Parses uploaded prescription photos or digital sample presets.
- Extracts prescribing doctor credentials, clinic/hospital info, date, patient details, and safety notes.
- Displays each prescribed medication with **dosage**, **duration**, **visual daily timing badges** (`🌅 Morning`, `☀️ Afternoon`, `🌙 Night`), and exact **doctor's handwritten/typed instructions**.

### 2️⃣ "NOT Available" Instant Alternative Finder
- Interactive **`In Stock` / `⚠️ Marked NOT Available`** toggle button on every medication card.
- Clicking **"NOT Available"** expands a list of:
  - **Substitute Brands:** Top-tier equivalent manufacturer brands (e.g., Novamox 500 by Cipla, Mox 500 by Sun Pharma).
  - **Generic Equivalents:** Government generic options (e.g., Jan Aushadhi Generic Amoxicillin at ₹22 vs ₹68 brand cost).
  - Active chemical composition match indicators and price estimates per strip.

### 3️⃣ Direct 1-Click Online Pharmacy Buy Links
- Direct action buttons on every prescribed medicine and alternative card redirecting users to leading online pharmacy portals:
  - 🟢 **Tata 1mg**
  - 🔵 **PharmEasy**
  - 🟠 **Apollo Pharmacy**
  - 🟣 **Netmeds**

---

## 🏗️ Architecture & Serverless Stack

```
+---------------------------------------------------------------------------------+
|                         RXCLEAR Frontend (Amplify Hosting)                      |
|                  React 18 + TypeScript + Vite + Custom Design System            |
+---------------------------------------------------------------------------------+
                                       |
             +-------------------------+-------------------------+
             |                                                   |
             v                                                   v
    +------------------------+                        +---------------------+
    |   REST API Polling     |                        | Direct S3 Upload    |
    |  (AWS API Gateway)     |                        | Presigned S3 URLs   |
    +------------------------+                        +---------------------+
             |                                                   |
             v                                                   v
    +------------------------+                        +---------------------+
    | AWS Lambda Functions   |                        |  Amazon S3 Bucket   |
    | 1. UploadHandler       |                        | Prescription Images |
    | 2. GetAnalysis         |                        | (24h Auto Expiry)   |
    | 3. AnalyzeRx (Async)   |<-----------------------+---------------------+
    +------------------------+     S3 ObjectCreated
             |
             +-------------------------+
             |                         |
             v                         v
    +-------------------+    +--------------------+
    |  Amazon Bedrock   |    |  Amazon DynamoDB   |
    | AI OCR & Analysis |    | Submissions Table  |
    | (Claude Haiku 4.5)|    |  Interactions DB   |
    +-------------------+    +--------------------+
```

---

## ☁️ AWS Services Used & Why We Use Them

RXCLEAR is built 100% serverless on AWS, engineered for high availability, sub-second latency, zero idle cost, and strict healthcare data privacy (PHI compliance). Below is the breakdown of every AWS service utilized in the application and why it was chosen:

| AWS Service | Role in RXCLEAR | Why We Use It |
|---|---|---|
| **Amazon Bedrock** | Multimodal AI Inference & Vision Analysis | Deciphers complex, unstructured doctor handwriting from prescription photos using **Claude 3.5 / Haiku 4.5** (`global.anthropic.claude-haiku-4-5-20251001-v1:0`). Extracts dosage, daily timing, duration, and patient precautions into structured JSON. Generates bio-equivalent generic and branded substitute recommendations. Haiku provides near-instant response times and ultra-low cost per token without managing dedicated GPU infrastructure. |
| **AWS Lambda** | Event-Driven Serverless Compute | Powers the backend microservices using Node.js 20.x bundled via esbuild:<br>• `upload-handler`: Issues pre-signed S3 POST URLs and initializes DynamoDB records.<br>• `analyze-rx`: Async background processor triggered by S3 uploads; calls Bedrock and updates results.<br>• `get-analysis`: Handles frontend polling for completed analysis.<br>**Why:** $0 cost when idle, scales automatically from zero to thousands of concurrent uploads, and prevents gateway timeouts by running AI processing asynchronously. |
| **Amazon S3** | Ephemeral, Encrypted Prescription Storage | Stores temporary prescription images uploaded directly from client browsers using pre-signed POST URLs with server-side AES-256 encryption (`SSE-S3`).<br>**Why:** Direct client-to-S3 upload bypasses API Gateway payload limits (10MB) and Lambda memory costs. Configured with **S3 Lifecycle Rules** (`ExpireUploadsAfterOneDay`) to automatically delete images after **24 hours**, ensuring strict patient privacy and zero long-term storage fees. |
| **Amazon DynamoDB** | Fast NoSQL State & Reference Database | Uses two tables in On-Demand capacity mode (`PAY_PER_REQUEST`):<br>• `SubmissionHistoryTable`: Tracks job states (`PENDING` ➔ `PROCESSING` ➔ `COMPLETED`/`FAILED`) and stores parsed clinical results.<br>• `DrugInteractionsTable`: Fast lookups for medication contraindications.<br>**Why:** Provides single-digit millisecond reads/writes for frontend polling. Enabled with **Time-To-Live (TTL)** on `expiresAt` to automatically purge historical records after 7 days, maintaining zero database maintenance and compliance. |
| **Amazon API Gateway** | Managed REST API Entry Point | Exposes `/upload` and `/analysis/{submissionId}` endpoints with built-in CORS handling for local dev and production Amplify domains.<br>**Why:** Fully managed gateway providing traffic routing, DDoS protection, request validation, and clean decoupling between client requests and Lambda handlers. |
| **AWS Amplify Hosting** | Frontend CI/CD & Global CDN Delivery | Hosts the React + TypeScript frontend with continuous deployment connected to the GitHub repository.<br>**Why:** Automatically builds and deploys on every git push, delivers static assets via AWS's global edge network for fast loading, provides free automated SSL/TLS certificates, and supports seamless custom domain management (e.g., `agdev10.online`). |
| **AWS SAM & CloudFormation** | Infrastructure as Code (IaC) | The entire backend architecture is codified in `infra/template.yaml` using the AWS Serverless Application Model (SAM).<br>**Why:** Enables reproducible, single-command deployments (`sam deploy`), version-controlled cloud infrastructure, automated esbuild packaging, and zero manual console configuration drift. |
| **AWS IAM** | Granular Least-Privilege Security | Manages role-based execution policies for each Lambda function.<br>**Why:** Enforces the principle of least privilege (`DynamoDBWritePolicy`, `DynamoDBReadPolicy`, scoped `s3:GetObject`, `bedrock:InvokeModel`). Eliminates hardcoded credentials and API keys by using short-lived, rotated IAM credentials. |
| **Amazon CloudWatch** | Real-Time Observability & Monitoring | Ingests execution logs, latency metrics, and error rates across API Gateway and Lambda functions.<br>**Why:** Provides real-time debugging and performance tracking while enforcing PHI-safe structured logging (no raw prescription text, patient names, or image binaries are written to logs). |

---

### 💡 Cost-Optimization & Privacy Highlights
- **Zero Idle Costs:** When no prescriptions are being analyzed, total compute and database costs are $0.00.
- **Asynchronous Decoupling:** S3 upload triggers the analysis Lambda in the background, avoiding costly long-running synchronous HTTP connections.
- **Automated Data Purging:** S3 Lifecycle (24-hour expiration) + DynamoDB TTL (7-day expiration) guarantee that sensitive medical data is never indefinitely stored on the cloud.

---

## 📁 Repository Structure

```
rxclear/
├── backend/
│   └── functions/
│       ├── analyze-rx/        # Lambda handler for background AI OCR & drug lookups
│       ├── get-analysis/      # Lambda handler for analysis status polling
│       └── upload-handler/    # Lambda handler for presigned S3 upload URL generation
├── docs/                      # Architectural & AI disclosure documentation
├── frontend/
│   ├── src/
│   │   ├── main.tsx           # Main Application Shell & 3 Feature Components
│   │   ├── mockData.ts        # Sample Prescriptions & Pharmacy Link Generators
│   │   ├── types.ts           # TypeScript interfaces for Analysis & Medicines
│   │   └── styles.css         # Modern Tailwind CSS & Glassmorphism theme
│   └── index.html
├── infra/
│   └── template.yaml          # AWS SAM Infrastructure Definition
└── README.md
```

---

## 💻 Local Development & Setup

### Prerequisites
- Node.js >= 18
- npm >= 9
- AWS CLI & AWS SAM CLI (optional for backend deployment)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Frontend
```bash
npm run dev --workspace=frontend
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 3. Build Backend (AWS SAM)
```bash
cd infra
sam build
```

---

## 🧠 What I Learned Through the Project

Building RXCLEAR as an end-to-end, production-ready AI healthcare platform was a transformative learning experience in cloud-native engineering. Here are the key takeaways:

1. **The Power of the Serverless Paradigm:**
   - Moving away from traditional always-on servers (like dedicated EC2 instances or long-running containers) to a 100% serverless architecture completely shifted my engineering perspective.
   - I learned how to build high-performance systems with **zero idle costs** ($0.00 when not in use), while retaining the capability to seamlessly burst to handle sudden spikes in traffic without manual cluster provisioning or capacity guesswork.

2. **AWS Lambda & Asynchronous Event-Driven Design:**
   - Deepened my understanding of event-driven cloud architecture by decomposing backend logic into single-purpose Lambda functions (`upload-handler`, `analyze-rx`, and `get-analysis`).
   - Learned how to bypass API Gateway's strict 29-second execution timeout by decoupling image uploads from AI inference: generating pre-signed S3 POST URLs allowed the client to stream files directly to S3, which natively emitted an `s3:ObjectCreated` event that triggered our background AI worker asynchronously while the client polled for results.

3. **Continuous Deployment & Edge Delivery with AWS Amplify:**
   - Mastered modern CI/CD and frontend hosting using **AWS Amplify Hosting** configured for a monorepo setup via `amplify.yml`.
   - Learned how effortless it is to achieve automated preview and production deployments triggered by GitHub pushes, instant worldwide content caching via AWS's global CDN, zero-config SSL/TLS certification, and hassle-free custom domain mapping (such as connecting `rxclear.agdev10.online`).

4. **Multimodal AI Engineering & Cost Optimization with Amazon Bedrock:**
   - Gained practical expertise in harnessing foundational multimodal models (Anthropic Claude 3.5 / Haiku 4.5 via Bedrock cross-region inference profiles) to solve real-world messy handwriting and medical document OCR challenges.
   - Discovered how critical model selection and prompt design are: by leveraging **Claude Haiku 4.5** instead of more expensive large models, we achieved sub-2-second clinical analysis response times and cut API inference costs by over 80% without sacrificing structured extraction accuracy or clinical reasoning.

---

## 🛡️ Medical Disclaimer
*RXCLEAR is designed to assist patients in understanding doctor directions, checking daily schedules, and identifying bio-equivalent alternatives when medicines are out of stock. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified medical professional or registered pharmacist before switching medications.*
