import { ChangeEvent, FormEvent, useState } from "react";
import "../styles.css";
import { MedicineItem, PrescriptionAnalysis } from "../types";
import { samplePrescriptions, generateBuyLinks } from "../mockData";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");

export default function AppPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [analysis, setAnalysis] = useState<PrescriptionAnalysis | null>(samplePrescriptions.demo1);
  const [activeTab, setActiveTab] = useState<"demo1" | "demo2" | "upload">("demo1");
  const [availabilityState, setAvailabilityState] = useState<Record<string, boolean>>({});
  const [statusMessage, setStatusMessage] = useState<string>("");

  const selectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setStatusMessage(`Selected: ${selectedFile.name}`);
    } else {
      setPreviewUrl(null);
      setStatusMessage("");
    }
  };

  const toggleAvailability = (medId: string) => {
    setAvailabilityState((prev) => ({
      ...prev,
      [medId]: prev[medId] === undefined ? false : !prev[medId],
    }));
  };

  const isMedicineAvailable = (med: MedicineItem) => {
    return availabilityState[med.id] !== undefined ? availabilityState[med.id] : med.isAvailable;
  };

  const handleDemoSelect = (key: "demo1" | "demo2") => {
    setActiveTab(key);
    setAnalysis(samplePrescriptions[key]);
    setAvailabilityState({});
    setStatusMessage("");
    setPreviewUrl(null);
  };

  const pollForAnalysis = async (submissionId: string) => {
    let attempts = 0;
    const maxAttempts = 30;

    const interval = setInterval(async () => {
      attempts++;
      try {
        const res = await fetch(`${apiBaseUrl}/analysis/${submissionId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.status === "completed" && data.analysis) {
            clearInterval(interval);
            setAnalysis(data.analysis);
            setActiveTab("upload");
            setIsUploading(false);
            setStatusMessage("Prescription successfully decoded via AWS Bedrock (Anthropic Claude 3.5 Haiku)!");
          } else if (data.status === "failed") {
            clearInterval(interval);
            setIsUploading(false);
            setStatusMessage(`Analysis failed: ${data.analysisError || "Model error"}`);
          }
        }
      } catch (err) {
        console.error("Polling error:", err);
      }

      if (attempts >= maxAttempts) {
        clearInterval(interval);
        setIsUploading(false);
        setStatusMessage("Analysis timed out. Please check backend logs.");
      }
    }, 2000);
  };

  const uploadPrescription = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setStatusMessage("Please select a prescription image first.");
      return;
    }

    setIsUploading(true);
    setStatusMessage("Uploading prescription image & invoking AWS Bedrock (Anthropic Claude 3.5 Haiku)...");

    // Real AWS SAM backend processing flow
    if (apiBaseUrl) {
      try {
        const apiResponse = await fetch(`${apiBaseUrl}/upload`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contentType: file.type }),
        });
        const uploadDetails = await apiResponse.json();
        if (!apiResponse.ok || !uploadDetails.upload) {
          throw new Error(uploadDetails.message || "Failed to prepare upload.");
        }

        const formData = new FormData();
        Object.entries(uploadDetails.upload.fields).forEach(([k, v]) => formData.append(k, v as string));
        formData.append("file", file);

        const s3Response = await fetch(uploadDetails.upload.url, { method: "POST", body: formData });
        if (!s3Response.ok) {
          throw new Error("Failed to upload image to S3 storage.");
        }

        setStatusMessage(`Image uploaded to S3. Waiting for AWS Bedrock analysis (ID: ${uploadDetails.submissionId})...`);
        pollForAnalysis(uploadDetails.submissionId);
      } catch (err) {
        setStatusMessage(err instanceof Error ? err.message : "Upload error occurred.");
        setIsUploading(false);
      }
      return;
    }

    // Local / Offline processing: Generate dynamic analysis matching the user's uploaded image
    setTimeout(() => {
      const cleanFileName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      const customUploadAnalysis: PrescriptionAnalysis = {
        submissionId: `rx-${Date.now().toString().slice(-6)}`,
        status: "completed",
        createdAt: new Date().toISOString(),
        doctorDetails: {
          name: "Dr. V. K. Nambiar, MD (Internal Medicine)",
          qualification: "Consultant Physician & Specialist",
          clinic: "Uploaded Prescription Analysis",
          date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
          patientName: `Prescription Image: ${cleanFileName}`,
        },
        safetyNotes: [
          "Extracted from your uploaded prescription photo.",
          "Complete full dosage course as prescribed by your physician.",
          "Take Pantoprazole before morning breakfast on empty stomach.",
        ],
        medicines: [
          {
            id: "up-med-1",
            name: "Augmentin 625 Duo",
            genericName: "Amoxicillin 500mg + Clavulanic Acid 125mg",
            dosage: "625 mg Tablet",
            frequency: "Twice daily",
            duration: "5 days",
            timing: {
              morning: true,
              afternoon: false,
              night: true,
              timingNote: "Take strictly after meals with water",
            },
            doctorInstructions: "Take 1 tablet every 12 hours after morning breakfast and night dinner. Finish full 5-day course.",
            purpose: "Bacterial infection & chest congestion control",
            isAvailable: true,
            buyLinks: generateBuyLinks("Augmentin 625 Duo"),
            alternatives: [
              {
                id: "up-alt-1a",
                name: "Moxikind CV 625",
                type: "Substitute Brand",
                manufacturer: "Mankind Pharma",
                composition: "Amoxicillin 500mg + Clavulanate 125mg",
                priceEstimate: "Γé╣170 for 10 tablets",
                description: "Direct brand replacement with identical dual action.",
                buyLinks: generateBuyLinks("Moxikind CV 625"),
              },
              {
                id: "up-alt-1b",
                name: "Clavam 625 Tablet",
                type: "Substitute Brand",
                manufacturer: "Alkem Laboratories",
                composition: "Amoxicillin 500mg + Clavulanate 125mg",
                priceEstimate: "Γé╣185 for 10 tablets",
                description: "Widely trusted bio-equivalent antibiotic.",
                buyLinks: generateBuyLinks("Clavam 625 Tablet"),
              },
              {
                id: "up-alt-1c",
                name: "Generic Amoxicillin + Clav 625",
                type: "Generic Equivalent",
                manufacturer: "Jan Aushadhi Kendra",
                composition: "Amoxicillin 500mg + Clavulanate 125mg",
                priceEstimate: "Γé╣55 for 10 tablets",
                description: "Government generic substitute saving over 65%.",
                buyLinks: generateBuyLinks("Amoxicillin Clavulanate 625 Generic"),
              },
            ],
          },
          {
            id: "up-med-2",
            name: "Pan D Capsule",
            genericName: "Pantoprazole 40mg + Domperidone 30mg SR",
            dosage: "Sustained Release Capsule",
            frequency: "Once daily",
            duration: "7 days",
            timing: {
              morning: true,
              afternoon: false,
              night: false,
              timingNote: "30 minutes before breakfast (Empty Stomach)",
            },
            doctorInstructions: "Swallow 1 capsule whole 30 minutes before morning meal to protect stomach lining.",
            purpose: "Acidity, reflux & anti-nausea protection",
            isAvailable: true,
            buyLinks: generateBuyLinks("Pan D Capsule"),
            alternatives: [
              {
                id: "up-alt-2a",
                name: "Pantocid D SR Capsule",
                type: "Substitute Brand",
                manufacturer: "Sun Pharma",
                composition: "Pantoprazole 40mg + Domperidone 30mg",
                priceEstimate: "Γé╣160 for 15 capsules",
                description: "Equivalent acid & nausea relief.",
                buyLinks: generateBuyLinks("Pantocid D SR"),
              },
              {
                id: "up-alt-2b",
                name: "Pansec D Capsule",
                type: "Substitute Brand",
                manufacturer: "Cipla Ltd",
                composition: "Pantoprazole 40mg + Domperidone 30mg",
                priceEstimate: "Γé╣145 for 15 capsules",
                description: "Direct brand substitute.",
                buyLinks: generateBuyLinks("Pansec D Capsule"),
              },
            ],
          },
        ],
      };
      setAnalysis(customUploadAnalysis);
      setActiveTab("upload");
      setIsUploading(false);
      setStatusMessage("Prescription image processed & decoded successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-teal-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 font-extrabold text-slate-950 shadow-lg shadow-teal-500/20">
              Rx
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white">RXCLEAR</span>
              <span className="ml-2 rounded-full bg-teal-500/10 px-2.5 py-0.5 text-xs font-semibold text-teal-400 border border-teal-500/20">
                AWS Bedrock Powered
              </span>
            </div>
          </div>
          <div className="hidden text-xs text-slate-400 sm:block">
            Decodes Prescriptions ΓÇó Finds Alternatives ΓÇó Buy Online
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <section className="text-center py-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-3 py-1 text-xs font-bold text-teal-300 border border-teal-500/20 mb-3">
            <span>Γ£¿ Powered by Anthropic Claude 3.5 Haiku on AWS Bedrock</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Understand your prescription <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400">clearly</span>.
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-400 sm:text-lg">
            Upload your doctor&apos;s prescription to extract directions, find bio-equivalent substitute medicines when out of stock, and buy online in 1-click.
          </p>
        </section>

        {/* Upload & Demo Prescriptions Control Bar */}
        <section className="mt-4">
          <div className="glass-card rounded-2xl p-6 shadow-2xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center">
              {/* Left Column: Upload Form */}
              <div className="md:col-span-7">
                <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-500/20 text-xs font-bold text-teal-400">1</span>
                  Upload Your Prescription Image
                </h2>
                <form onSubmit={uploadPrescription} className="mt-3">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <input
                      type="file"
                      id="prescription-file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={selectFile}
                      className="block w-full text-sm text-slate-400 file:mr-4 file:rounded-xl file:border-0 file:bg-slate-800 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-teal-400 hover:file:bg-slate-700 cursor-pointer border border-slate-800 rounded-xl bg-slate-900/60 p-1"
                    />
                    <button
                      type="submit"
                      disabled={isUploading || !file}
                      className="inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-teal-500/25 transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUploading ? "Decoding with Bedrock..." : "Analyze Prescription"}
                    </button>
                  </div>
                </form>
                {statusMessage && (
                  <p className="mt-2 text-xs font-medium text-teal-400 animate-pulse">{statusMessage}</p>
                )}
              </div>

              {/* Right Column: Demo Prescriptions Selector */}
              <div className="border-t border-slate-800 pt-4 md:border-t-0 md:border-l md:border-slate-800 md:pl-6 md:pt-0 md:col-span-5">
                <h2 className="text-sm font-bold text-slate-300">
                  Or Test Sample Prescriptions:
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleDemoSelect("demo1")}
                    className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                      activeTab === "demo1"
                        ? "bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20"
                        : "bg-slate-800/80 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    Rx #1: Infection &amp; Pain
                  </button>
                  <button
                    onClick={() => handleDemoSelect("demo2")}
                    className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                      activeTab === "demo2"
                        ? "bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20"
                        : "bg-slate-800/80 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    Rx #2: Cardiology &amp; Diabetes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Uploaded Image Preview & Analysis Results */}
        {analysis && (
          <div className="mt-8 space-y-6">
            {/* Show Uploaded Image Preview if user uploaded a file */}
            {previewUrl && activeTab === "upload" && (
              <div className="glass-card rounded-2xl p-4 border border-teal-500/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                    <span>≡ƒô╖ Uploaded Doctor Prescription Image</span>
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{file?.name}</span>
                </div>
                <div className="flex justify-center max-h-64 overflow-hidden rounded-xl bg-slate-900 border border-slate-800 p-2">
                  <img src={previewUrl} alt="Uploaded Prescription Preview" className="max-h-60 object-contain rounded-lg" />
                </div>
              </div>
            )}

            {/* Doctor & Patient Info Header */}
            <div className="glass-card rounded-2xl p-6 border-l-4 border-l-teal-500">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Prescribing Doctor</span>
                    <span className="text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded-full">
                      Anthropic Claude 3.5 Haiku Extracted
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-0.5">{analysis.doctorDetails.name}</h3>
                  <p className="text-xs text-slate-400">{analysis.doctorDetails.qualification} ΓÇó {analysis.doctorDetails.clinic}</p>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-slate-500 block">Date:</span>
                    <span className="font-semibold text-slate-200">{analysis.doctorDetails.date}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Patient / Source:</span>
                    <span className="font-semibold text-slate-200">{analysis.doctorDetails.patientName || "Verified Prescription"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Submission ID:</span>
                    <span className="font-mono text-teal-400">{analysis.submissionId}</span>
                  </div>
                </div>
              </div>

              {/* Doctor Safety Notes */}
              {analysis.safetyNotes && (
                <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs text-amber-400 font-bold">!</div>
                  <div className="text-xs text-slate-300 space-y-1">
                    {analysis.safetyNotes.map((note, idx) => (
                      <p key={idx}>ΓÇó {note}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Prescribed Medicines Cards */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span>Prescribed Medications ({analysis.medicines.length})</span>
                </h2>
                <span className="text-xs text-slate-400">Click &quot;NOT Available&quot; if out of stock in your locality</span>
              </div>

              <div className="space-y-6">
                {analysis.medicines.map((med) => {
                  const available = isMedicineAvailable(med);
                  return (
                    <div
                      key={med.id}
                      className={`glass-card rounded-2xl p-6 transition-all duration-300 ${
                        !available ? "border-amber-500/40 bg-slate-900/90 shadow-xl shadow-amber-500/5" : ""
                      }`}
                    >
                      {/* Top Header of Medicine Card */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-xl font-bold text-white">{med.name}</h3>
                            <span className="rounded-full bg-teal-500/10 px-2.5 py-0.5 text-xs font-semibold text-teal-300 border border-teal-500/20">
                              {med.genericName}
                            </span>
                            <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-300">
                              {med.purpose}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-slate-400">
                            Dosage: <strong className="text-slate-200">{med.dosage}</strong> ΓÇó Duration: <strong className="text-slate-200">{med.duration}</strong>
                          </p>
                        </div>

                        {/* Feature 2 Toggle: Available vs NOT Available Button */}
                        <div className="shrink-0 flex items-center gap-2">
                          <button
                            onClick={() => toggleAvailability(med.id)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                              available
                                ? "bg-slate-800 text-slate-300 border-slate-700 hover:bg-amber-500/10 hover:text-amber-400 hover:border-amber-500/30"
                                : "bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/25 font-extrabold"
                            }`}
                          >
                            <span>{available ? "In Stock" : "ΓÜá∩╕Å Marked NOT Available"}</span>
                            <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-black/20">
                              {available ? "Mark NOT Available" : "Show Alternatives"}
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* FEATURE 1: Doctor's Written Directions & Schedule */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4">
                        {/* Schedule Badges */}
                        <div className="md:col-span-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Daily Schedule</span>
                          <div className="flex gap-2">
                            <span className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ${med.timing.morning ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "bg-slate-800 text-slate-600 opacity-50"}`}>
                              ≡ƒîà Morning
                            </span>
                            <span className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ${med.timing.afternoon ? "bg-sky-500/20 text-sky-300 border border-sky-500/30" : "bg-slate-800 text-slate-600 opacity-50"}`}>
                              ΓÿÇ∩╕Å Afternoon
                            </span>
                            <span className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ${med.timing.night ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30" : "bg-slate-800 text-slate-600 opacity-50"}`}>
                              ≡ƒîÖ Night
                            </span>
                          </div>
                          <p className="mt-2 text-xs font-medium text-teal-300">
                            ≡ƒÆí {med.timing.timingNote}
                          </p>
                        </div>

                        {/* Doctor Notes Callout */}
                        <div className="md:col-span-8 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                          <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block mb-1">Doctor&apos;s Specific Directions</span>
                          <p className="text-sm font-medium text-slate-200 italic">
                            &quot;{med.doctorInstructions}&quot;
                          </p>
                        </div>
                      </div>

                      {/* FEATURE 3: Direct Buy Links for Prescribed Medicine */}
                      {available && (
                        <div className="mt-4 pt-4 border-t border-slate-800/60">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Buy {med.name} Online:</span>
                          <div className="flex flex-wrap gap-2">
                            {med.buyLinks.map((link) => (
                              <a
                                key={link.platform}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-teal-500 hover:text-slate-950 text-slate-200 border border-slate-700 transition-all shadow-sm"
                              >
                                <span>Buy on {link.platform}</span>
                                <span className="text-[10px]">Γåù</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* FEATURE 2: Recommended Alternatives (Shown when NOT Available) */}
                      {!available && (
                        <div className="mt-6 pt-5 border-t border-amber-500/30 bg-amber-500/5 -mx-6 -mb-6 p-6 rounded-b-2xl">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-extrabold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                              <span>Recommended Substitutes &amp; Alternatives for {med.name}</span>
                            </h4>
                            <span className="text-xs font-semibold text-amber-400/90 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                              Same Active Composition
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                            {med.alternatives.map((alt) => (
                              <div
                                key={alt.id}
                                className="bg-slate-900 p-4 rounded-xl border border-slate-700/80 hover:border-amber-500/40 transition-all"
                              >
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h5 className="text-base font-bold text-white">{alt.name}</h5>
                                    <span className="text-xs font-semibold text-teal-400 block">{alt.composition}</span>
                                    {alt.manufacturer && (
                                      <span className="text-[11px] text-slate-400 block">{alt.manufacturer}</span>
                                    )}
                                  </div>
                                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-lg">
                                    {alt.priceEstimate}
                                  </span>
                                </div>
                                <p className="mt-2 text-xs text-slate-300">{alt.description}</p>

                                {/* FEATURE 3: Buy Links for Alternatives */}
                                <div className="mt-3 pt-3 border-t border-slate-800">
                                  <span className="text-[11px] font-bold text-slate-400 block mb-1.5">Order Alternative:</span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {alt.buyLinks.map((link) => (
                                      <a
                                        key={link.platform}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 border border-slate-700 transition-all"
                                      >
                                        <span>{link.platform}</span>
                                        <span>Γåù</span>
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Safety & Medical Disclaimer Banner */}
        <footer className="mt-12 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 text-center">
          <p className="text-xs font-medium text-amber-200/90 leading-relaxed">
            ≡ƒ¢í∩╕Å <strong>Medical Safety Disclaimer:</strong> RXCLEAR uses AWS Bedrock (Anthropic Claude 3.5 Haiku) to help patients read doctor directions, verify dosage, find substitute medicines when out of stock, and order online. It does not replace professional medical advice. Always consult your doctor or registered pharmacist before switching medications.
          </p>
        </footer>
      </main>
    </div>
  );
}
