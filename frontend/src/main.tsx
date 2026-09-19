import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const App = () => (
  <main className="min-h-screen bg-canvas px-6 py-10 text-ink sm:px-10">
    <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-2xl flex-col justify-center">
      <p className="text-sm font-semibold tracking-[0.2em] text-teal">RXCLEAR</p>
      <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
        Understand your prescription, clearly.
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-ink/80">
        Upload support is being prepared. RXCLEAR will explain the medicines written on a prescription in plain language.
      </p>
      <button className="mt-9 min-h-11 w-full rounded-md bg-teal px-5 py-3 text-base font-semibold text-white opacity-50 sm:w-auto" disabled type="button">
        Upload prescription
      </button>
      <p className="mt-10 border-l-4 border-amber bg-amber/10 px-4 py-4 text-base leading-7 text-ink">
        RXCLEAR helps you understand a prescription. It does not diagnose, recommend treatment, or replace advice from your doctor or pharmacist.
      </p>
    </div>
  </main>
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

