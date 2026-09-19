export default function ProductShowcase() {
  return (
    <section
      id="product"
      className="lp-section lp-showcase"
      aria-labelledby="showcase-headline"
    >
      <div className="lp-container">
        <div className="lp-section-header" style={{ textAlign: "center" }}>
          <span className="lp-eyebrow">The product</span>
          <h2
            id="showcase-headline"
            className="lp-display lp-display-md"
            style={{ marginTop: "16px", marginBottom: "12px" }}
          >
            From prescription to action, step by step.
          </h2>
          <p className="lp-body-sm" style={{ maxWidth: "560px", margin: "0 auto" }}>
            A look at the actual RXCLEAR workflow — exactly as it appears in the application.
          </p>
        </div>

        {/* Browser chrome frame */}
        <div className="lp-showcase-frame">
          <div className="lp-showcase-bar" aria-hidden="true">
            <div className="lp-showcase-dot lp-showcase-dot-r" />
            <div className="lp-showcase-dot lp-showcase-dot-y" />
            <div className="lp-showcase-dot lp-showcase-dot-g" />
            <div className="lp-showcase-url">rxclear.app/app</div>
          </div>

          <div className="lp-showcase-content">
            {/* Medicine card */}
            <div className="lp-app-card">
              <div className="lp-app-label">Prescribed Medication</div>
              <div className="lp-app-medicine">Augmentin 625 Duo</div>
              <div className="lp-app-generic">Amoxicillin 500mg + Clavulanic Acid 125mg</div>

              <div className="lp-app-notavail">
                <span>⚠️</span> Marked NOT Available
              </div>

              <div className="lp-app-schedule">
                <span className="lp-app-badge lp-app-badge-m">🌅 Morning</span>
                <span className="lp-app-badge lp-app-badge-n">🌙 Night</span>
              </div>

              <p className="lp-app-instructions" style={{ marginTop: "12px" }}>
                "Take 1 tablet every 12 hours after meals. Finish full 5-day course."
              </p>
            </div>

            {/* Alternatives panel */}
            <div className="lp-app-card" style={{ borderColor: "rgba(245,158,11,0.25)", background: "rgba(30,41,59,0.65)" }}>
              <div className="lp-app-alt-title">Recommended Substitutes · Same Active Composition</div>

              <div className="lp-app-alt-item">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <div className="lp-app-alt-name">Moxikind CV 625</div>
                    <div className="lp-app-alt-comp">Amoxicillin 500mg + Clavulanate 125mg</div>
                    <div style={{ fontSize: "0.65rem", color: "#475569", fontFamily: "Inter, sans-serif" }}>Mankind Pharma</div>
                  </div>
                  <div className="lp-app-alt-price">₹170 / 10 tabs</div>
                </div>
                <div className="lp-app-buy-row">
                  {["Tata 1mg", "PharmEasy", "Apollo"].map((p) => (
                    <span key={p} className="lp-app-buy-btn">{p} ↗</span>
                  ))}
                </div>
              </div>

              <div className="lp-app-alt-item">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <div className="lp-app-alt-name">Generic Amoxicillin + Clav 625</div>
                    <div className="lp-app-alt-comp">Amoxicillin 500mg + Clavulanate 125mg</div>
                    <div style={{ fontSize: "0.65rem", color: "#475569", fontFamily: "Inter, sans-serif" }}>Jan Aushadhi Kendra</div>
                  </div>
                  <div className="lp-app-alt-price">₹55 / 10 tabs</div>
                </div>
                <div className="lp-app-buy-row">
                  {["Tata 1mg", "Netmeds"].map((p) => (
                    <span key={p} className="lp-app-buy-btn">{p} ↗</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
