import { Link } from "react-router-dom";

export default function Hero() {
  const scrollToHowItWorks = () => {
    const el = document.getElementById("how-it-works");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="lp-hero" aria-labelledby="hero-headline">
      <div className="lp-hero-inner">
        <div className="lp-hero-text">
          <span className="lp-eyebrow lp-animate-fade-up lp-delay-1" aria-label="Category">
            AI-powered prescription clarity
          </span>

          <h1
            id="hero-headline"
            className="lp-display lp-display-lg lp-animate-fade-up lp-delay-2"
          >
            Understand your prescription.{" "}
            <em style={{ fontStyle: "italic", color: "var(--lp-accent)" }}>
              Without the confusion.
            </em>
          </h1>

          <p className="lp-body lp-animate-fade-up lp-delay-3">
            RXCLEAR turns complex prescriptions into clear medication schedules,
            helps surface equivalent alternatives when medicines are unavailable,
            and connects users to online pharmacy options.
          </p>

          <div className="lp-hero-ctas lp-animate-fade-up lp-delay-4">
            <Link
              to="/app"
              className="lp-btn-primary lp-btn-primary-lg"
              id="hero-cta-primary"
            >
              Try RXCLEAR <span className="lp-arrow" aria-hidden="true">→</span>
            </Link>
            <button
              className="lp-btn-secondary"
              id="hero-cta-secondary"
              onClick={scrollToHowItWorks}
              aria-label="Scroll to how it works section"
            >
              See how it works{" "}
              <span aria-hidden="true" style={{ fontSize: "0.9em" }}>↓</span>
            </button>
          </div>
        </div>

        {/* Product video */}
        <div
          className="lp-hero-video-wrap lp-animate-fade-up lp-delay-5"
          style={{ animationName: "lp-fade-up", transform: undefined }}
        >
          <HeroVideo />
        </div>
      </div>
    </section>
  );
}

function HeroVideo() {
  return (
    <div className="lp-video-fallback" role="img" aria-label="RXCLEAR application demonstration: prescription upload, medicine decoding, alternatives, and pharmacy links">
      {/* Styled fallback showing the RXCLEAR workflow preview */}
      <div style={{
        width: "100%",
        aspectRatio: "16/9",
        background: "#0f172a",
        borderRadius: "inherit",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background grid */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />

        {/* Mock app UI preview */}
        <div style={{
          position: "relative",
          width: "88%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "14px",
        }}>
          {/* Left: Prescription card */}
          <div style={{
            background: "rgba(30,41,59,0.85)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "14px",
            padding: "18px",
          }}>
            <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", color: "#5eead4", textTransform: "uppercase", marginBottom: "10px", fontFamily: "Inter, sans-serif" }}>
              Prescribing Doctor
            </div>
            <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#f1f5f9", fontFamily: "Inter, sans-serif", marginBottom: "2px" }}>Dr. S. K. Sharma, MD</div>
            <div style={{ fontSize: "0.7rem", color: "#94a3b8", fontFamily: "Inter, sans-serif", marginBottom: "16px" }}>General Physician · Apollo Clinic</div>
            <div style={{ background: "rgba(15,23,42,0.6)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "12px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#f1f5f9", fontFamily: "Inter, sans-serif" }}>Augmentin 625 Duo</div>
                <div style={{ background: "rgba(245,158,11,0.9)", color: "#0f172a", fontSize: "0.6rem", fontWeight: 800, padding: "3px 7px", borderRadius: "5px", fontFamily: "Inter, sans-serif" }}>⚠ NOT Available</div>
              </div>
              <div style={{ fontSize: "0.7rem", color: "#5eead4", fontFamily: "Inter, sans-serif", marginBottom: "8px" }}>Amoxicillin 500mg + Clavulanic Acid 125mg</div>
              <div style={{ display: "flex", gap: "5px" }}>
                <span style={{ fontSize: "0.65rem", fontWeight: 600, padding: "3px 8px", borderRadius: "6px", background: "rgba(245,158,11,0.2)", color: "#fcd34d", border: "1px solid rgba(245,158,11,0.3)", fontFamily: "Inter, sans-serif" }}>🌅 Morning</span>
                <span style={{ fontSize: "0.65rem", fontWeight: 600, padding: "3px 8px", borderRadius: "6px", background: "rgba(99,102,241,0.2)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.3)", fontFamily: "Inter, sans-serif" }}>🌙 Night</span>
              </div>
            </div>
          </div>

          {/* Right: Alternatives card */}
          <div style={{
            background: "rgba(30,41,59,0.85)",
            border: "1px solid rgba(245,158,11,0.25)",
            borderRadius: "14px",
            padding: "18px",
          }}>
            <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", color: "#fbbf24", textTransform: "uppercase", marginBottom: "10px", fontFamily: "Inter, sans-serif" }}>
              Recommended Substitutes
            </div>
            {[
              { name: "Moxikind CV 625", mfr: "Mankind Pharma", price: "₹170 / 10 tabs" },
              { name: "Clavam 625 Tablet", mfr: "Alkem Laboratories", price: "₹185 / 10 tabs" },
            ].map((alt, i) => (
              <div key={i} style={{
                background: "#0f172a",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "10px",
                padding: "10px 12px",
                marginBottom: "8px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#f1f5f9", fontFamily: "Inter, sans-serif" }}>{alt.name}</div>
                    <div style={{ fontSize: "0.65rem", color: "#5eead4", fontFamily: "Inter, sans-serif" }}>Amoxicillin 500mg + Clavulanate 125mg</div>
                    <div style={{ fontSize: "0.6rem", color: "#64748b", fontFamily: "Inter, sans-serif" }}>{alt.mfr}</div>
                  </div>
                  <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "#34d399", background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)", padding: "3px 7px", borderRadius: "6px", fontFamily: "Inter, sans-serif", whiteSpace: "nowrap" }}>
                    {alt.price}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "5px", marginTop: "8px", flexWrap: "wrap" }}>
                  {["Tata 1mg", "PharmEasy", "Apollo"].map(p => (
                    <span key={p} style={{ fontSize: "0.6rem", fontWeight: 600, color: "#94a3b8", background: "rgba(30,41,59,0.9)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "5px", padding: "3px 7px", fontFamily: "Inter, sans-serif" }}>
                      {p} ↗
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overlay label */}
        <div style={{
          position: "absolute",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(217,119,69,0.12)",
          border: "1px solid rgba(217,119,69,0.3)",
          borderRadius: "100px",
          padding: "6px 16px",
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "#D97745",
          fontFamily: "Inter, sans-serif",
          whiteSpace: "nowrap",
          backdropFilter: "blur(8px)",
        }}>
          ✦ Live application preview
        </div>
      </div>
    </div>
  );
}
