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
+-----------------------------------------------------------------------+
|                            RXCLEAR Frontend                           |
|                  React 18 + TypeScript + Tailwind CSS                 |
+-----------------------------------------------------------------------+
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
+-------------------+    +--------------------+
```

### Serverless Architecture Highlights:
- **Event-Driven Execution:** Uses AWS Lambda, S3 event notifications, and DynamoDB for asynchronous background processing without maintaining 24/7 dedicated servers.
- **Privacy & PHI Safety:** Automated S3 lifecycle rules automatically delete uploaded prescription images after **24 hours**. DynamoDB TTL removes history after **7 days**. Structured CloudWatch logging explicitly enforces PHI/PII safety rules.
- **Infrastructure as Code:** Fully declared using **AWS SAM** (`infra/template.yaml`).

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

## 🛡️ Medical Disclaimer
*RXCLEAR is designed to assist patients in understanding doctor directions, checking daily schedules, and identifying bio-equivalent alternatives when medicines are out of stock. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified medical professional or registered pharmacist before switching medications.*
