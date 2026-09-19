import { Link } from "react-router-dom";

export default function FeatureSections() {
  return (
    <div id="features">
      {/* Feature 1 */}
      <section className="lp-section" aria-labelledby="feature1-headline">
        <div className="lp-container">
          <div className="lp-feature">
            <div className="lp-feature-text">
              <span className="lp-eyebrow">Feature 01</span>
              <h3 id="feature1-headline">
                Turn a prescription into a plan you can actually follow.
              </h3>
              <p>
                Doctor handwriting and dense medical shorthand shouldn't get
                between you and your treatment. RXCLEAR reads the prescription
                and presents every medicine's name, dosage, duration, and daily
                timing — morning, afternoon, night — in plain language.
                Doctor-specific instructions are shown exactly as written.
              </p>
              <Link to="/app" className="lp-btn-primary" id="feature1-cta">
                Decode a prescription <span className="lp-arrow" aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="lp-feature-visual" aria-hidden="true">
              <div className="lp-feature-visual-inner">
                {/* Prescription card */}
                <div className="lp-rx-card">
                  <div className="lp-rx-header">
                    <div className="lp-rx-logo" aria-hidden="true">Rx</div>
                    <div>
                      <div className="lp-rx-doctor">Dr. S. K. Sharma, MD</div>
                      <div className="lp-rx-doctor-sub">General Physician · Apollo Clinic</div>
                    </div>
                  </div>
                  {[
                    {
                      name: "Augmentin 625 Duo",
                      detail: "625mg · Twice daily · 5 days",
                      morning: true,
                      night: true,
                    },
                    {
                      name: "Pan D Capsule",
                      detail: "40mg + 30mg SR · Once daily · 7 days",
                      morning: true,
                      night: false,
                    },
                  ].map((med) => (
                    <div key={med.name} className="lp-rx-med">
                      <div className="lp-rx-med-name">{med.name}</div>
                      <div className="lp-rx-med-detail">{med.detail}</div>
                      <div className="lp-rx-timing">
                        {med.morning && (
                          <span className="lp-rx-timing-badge lp-rx-timing-morning">🌅 Morning</span>
                        )}
                        {med.night && (
                          <span className="lp-rx-timing-badge lp-rx-timing-night">🌙 Night</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="lp-divider" />

      {/* Feature 2 */}
      <section className="lp-section lp-section-alt" aria-labelledby="feature2-headline">
        <div className="lp-container">
          <div className="lp-feature lp-feature-reversed">
            <div className="lp-feature-text">
              <span className="lp-eyebrow">Feature 02</span>
              <h3 id="feature2-headline">
                When your medicine isn't available, find the next best option.
              </h3>
              <p>
                Mark any prescribed medicine as "NOT Available" and RXCLEAR
                instantly surfaces bio-equivalent substitute brands and generic
                alternatives with the same active composition. Price estimates
                are shown so you can make an informed decision — including
                government generic options through Jan Aushadhi.
              </p>
              <Link to="/app" className="lp-btn-primary" id="feature2-cta">
                Try it yourself <span className="lp-arrow" aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="lp-feature-visual" aria-hidden="true">
              <div className="lp-alt-visual">
                {/* Original — crossed out / unavailable */}
                <div className="lp-alt-source">
                  <span className="lp-alt-source-name">Augmentin 625 Duo</span>
                  <span className="lp-alt-source-badge">⚠ Not available</span>
                </div>
                {/* Alternatives */}
                <div className="lp-alt-card">
                  <div className="lp-alt-tag">Substitute Brand</div>
                  <div className="lp-alt-name">Moxikind CV 625</div>
                  <div className="lp-alt-comp">Amoxicillin 500mg + Clavulanate 125mg</div>
                  <span className="lp-alt-match">
                    <span>✓</span> Same composition
                  </span>
                </div>
                <div className="lp-alt-card">
                  <div className="lp-alt-tag">Generic Equivalent</div>
                  <div className="lp-alt-name">Generic Amoxicillin + Clav 625</div>
                  <div className="lp-alt-comp">Jan Aushadhi Kendra · ₹55 / 10 tabs</div>
                  <span className="lp-alt-match">
                    <span>✓</span> Same composition · save 65%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="lp-divider" />

      {/* Feature 3 */}
      <section className="lp-section" aria-labelledby="feature3-headline">
        <div className="lp-container">
          <div className="lp-feature">
            <div className="lp-feature-text">
              <span className="lp-eyebrow">Feature 03</span>
              <h3 id="feature3-headline">
                From prescription to pharmacy, in one click.
              </h3>
              <p>
                Every prescribed medicine and every alternative comes with
                direct links to Tata 1mg, PharmEasy, Apollo Pharmacy, and
                Netmeds. No manual searching, no spelling errors. You land
                directly on the right product page on each platform.
              </p>
              <Link to="/app" className="lp-btn-primary" id="feature3-cta">
                Start with a prescription <span className="lp-arrow" aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="lp-feature-visual" aria-hidden="true">
              <div className="lp-pharmacy-visual">
                {[
                  {
                    name: "Augmentin 625 Duo",
                    platforms: ["Tata 1mg", "PharmEasy", "Apollo", "Netmeds"],
                    colors: [
                      "lp-pharmacy-link-tata",
                      "lp-pharmacy-link-pharma",
                      "lp-pharmacy-link-apollo",
                      "lp-pharmacy-link-netmeds",
                    ],
                  },
                  {
                    name: "Moxikind CV 625 (alt)",
                    platforms: ["Tata 1mg", "PharmEasy", "Apollo", "Netmeds"],
                    colors: [
                      "lp-pharmacy-link-tata",
                      "lp-pharmacy-link-pharma",
                      "lp-pharmacy-link-apollo",
                      "lp-pharmacy-link-netmeds",
                    ],
                  },
                ].map((med) => (
                  <div key={med.name} className="lp-pharmacy-med">
                    <div className="lp-pharmacy-med-name">{med.name}</div>
                    <div className="lp-pharmacy-links">
                      {med.platforms.map((p, i) => (
                        <span key={p} className={`lp-pharmacy-link ${med.colors[i]}`}>
                          {p} <span style={{ opacity: 0.6, fontSize: "0.65em" }}>↗</span>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
