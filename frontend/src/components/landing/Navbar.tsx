import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className="lp-navbar lp-animate-fade-in" aria-label="Main navigation">
        <div className="lp-navbar-inner">
          {/* Logo */}
          <Link to="/" className="lp-navbar-logo" aria-label="RXCLEAR home">
            <span aria-hidden="true">Rx</span>
            RXCLEAR
          </Link>

          {/* Desktop nav links */}
          <ul className="lp-nav-links" role="list">
            <li>
              <button
                onClick={() => scrollTo("product")}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "0.875rem", fontWeight: 500, color: "var(--lp-text-2)", padding: 0, transition: "color 0.15s ease" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--lp-text)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--lp-text-2)")}
              >
                Product
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollTo("how-it-works")}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "0.875rem", fontWeight: 500, color: "var(--lp-text-2)", padding: 0, transition: "color 0.15s ease" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--lp-text)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--lp-text-2)")}
              >
                How it works
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollTo("features")}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "0.875rem", fontWeight: 500, color: "var(--lp-text-2)", padding: 0, transition: "color 0.15s ease" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--lp-text)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--lp-text-2)")}
              >
                Features
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollTo("privacy")}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "0.875rem", fontWeight: 500, color: "var(--lp-text-2)", padding: 0, transition: "color 0.15s ease" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--lp-text)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--lp-text-2)")}
              >
                Privacy
              </button>
            </li>
          </ul>

          {/* Desktop actions */}
          <div className="lp-navbar-actions">
            <a
              href="https://github.com/ajayg10/rxclear"
              target="_blank"
              rel="noopener noreferrer"
              className="lp-btn-ghost"
              aria-label="View RXCLEAR on GitHub (opens in new tab)"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
            <Link to="/app" className="lp-btn-primary" id="nav-try-rxclear">
              Try RXCLEAR <span className="lp-arrow" aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="lp-hamburger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="lp-mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span style={menuOpen ? { transform: "rotate(45deg) translateY(7px)" } : {}} />
            <span style={menuOpen ? { opacity: 0 } : {}} />
            <span style={menuOpen ? { transform: "rotate(-45deg) translateY(-7px)" } : {}} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="lp-mobile-menu"
        className={`lp-mobile-menu${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <button onClick={() => scrollTo("product")} style={{ background: "none", border: "none", textAlign: "left", cursor: "pointer", fontFamily: "inherit", fontSize: "1rem", fontWeight: 500, color: "var(--lp-text-2)", padding: "10px 0", borderBottom: "1px solid var(--lp-border)", width: "100%" }}>
          Product
        </button>
        <button onClick={() => scrollTo("how-it-works")} style={{ background: "none", border: "none", textAlign: "left", cursor: "pointer", fontFamily: "inherit", fontSize: "1rem", fontWeight: 500, color: "var(--lp-text-2)", padding: "10px 0", borderBottom: "1px solid var(--lp-border)", width: "100%" }}>
          How it works
        </button>
        <button onClick={() => scrollTo("features")} style={{ background: "none", border: "none", textAlign: "left", cursor: "pointer", fontFamily: "inherit", fontSize: "1rem", fontWeight: 500, color: "var(--lp-text-2)", padding: "10px 0", borderBottom: "1px solid var(--lp-border)", width: "100%" }}>
          Features
        </button>
        <button onClick={() => scrollTo("privacy")} style={{ background: "none", border: "none", textAlign: "left", cursor: "pointer", fontFamily: "inherit", fontSize: "1rem", fontWeight: 500, color: "var(--lp-text-2)", padding: "10px 0", borderBottom: "1px solid var(--lp-border)", width: "100%" }}>
          Privacy
        </button>
        <a href="https://github.com/ajayg10/rxclear" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
          GitHub ↗
        </a>
        <Link to="/app" className="lp-btn-primary" id="mobile-nav-try-rxclear" onClick={() => setMenuOpen(false)}>
          Try RXCLEAR <span className="lp-arrow" aria-hidden="true">→</span>
        </Link>
      </div>
    </>
  );
}
