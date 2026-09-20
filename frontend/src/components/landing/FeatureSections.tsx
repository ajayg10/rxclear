import { Link } from "react-router-dom";
import feature1Img from "../../assets/feature_1.png";
import feature2Img from "../../assets/feature_2.png";
import feature3Img from "../../assets/feature_3.png";

const imgStyle: React.CSSProperties = {
  width: "100%",
  height: "auto",
  display: "block",
};

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
              <img
                src={feature1Img}
                alt="RXCLEAR medication schedule UI"
                style={imgStyle}
              />
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
              <img
                src={feature2Img}
                alt="RXCLEAR alternative medicine options UI"
                style={imgStyle}
              />
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
              <img
                src={feature3Img}
                alt="RXCLEAR pharmacy link options UI"
                style={imgStyle}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
