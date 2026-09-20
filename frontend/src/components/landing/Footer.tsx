import { Link } from "react-router-dom";

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Disclaimer */}
      <div className="lp-disclaimer" role="complementary" aria-label="Medical disclaimer">
        <div className="lp-container">
          <p>
            <strong>Medical Disclaimer:</strong> RXCLEAR helps users understand
            prescriptions and explore medicine alternatives. It is not a substitute
            for professional medical advice, diagnosis, or treatment. Always consult
            a qualified medical professional or registered pharmacist before
            switching medications.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <Link to="/" className="lp-footer-logo" aria-label="RXCLEAR home">
            <span className="lp-footer-logo-badge" aria-hidden="true">Rx</span>
            RXCLEAR
          </Link>

          <nav className="lp-footer-links" aria-label="Footer navigation">
            <button
              onClick={() => scrollTo("product")}
              style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "0.875rem", color: "var(--lp-text-2)", padding: 0 }}
            >
              Product
            </button>
            <button
              onClick={() => scrollTo("how-it-works")}
              style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "0.875rem", color: "var(--lp-text-2)", padding: 0 }}
            >
              How it works
            </button>
            <button
              onClick={() => scrollTo("features")}
              style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "0.875rem", color: "var(--lp-text-2)", padding: 0 }}
            >
              Features
            </button>
            <button
              onClick={() => scrollTo("privacy")}
              style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "0.875rem", color: "var(--lp-text-2)", padding: 0 }}
            >
              Privacy
            </button>
            <button
              onClick={() => {
                const el = document.querySelector(".lp-disclaimer");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "0.875rem", color: "var(--lp-text-2)", padding: 0 }}
            >
              Disclaimer
            </button>
            <a
              href="https://github.com/ajayg10/rxclear"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View RXCLEAR on GitHub (opens in new tab)"
            >
              GitHub ↗
            </a>
          </nav>

          <span className="lp-footer-copy">
            © {new Date().getFullYear()} RXCLEAR
          </span>
        </div>
      </footer>
    </>
  );
}
