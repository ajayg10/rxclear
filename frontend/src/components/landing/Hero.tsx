import { Link } from "react-router-dom";
import heroImg from "../../assets/hero.jpg";

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
          <img 
            src={heroImg} 
            alt="RXCLEAR application demonstration" 
            style={{ width: "100%", height: "auto", display: "block", borderRadius: "inherit" }} 
          />
        </div>
      </div>
    </section>
  );
}

