import { Link } from "react-router-dom";

export default function FinalCTA() {
  return (
    <section
      className="lp-final-cta"
      aria-labelledby="final-cta-headline"
    >
      <div className="lp-container">
        <h2 id="final-cta-headline">
          Make your prescription<br />
          easier to understand.
        </h2>
        <Link
          to="/app"
          className="lp-btn-primary lp-btn-primary-lg"
          id="final-cta-btn"
        >
          Try RXCLEAR <span className="lp-arrow" aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
