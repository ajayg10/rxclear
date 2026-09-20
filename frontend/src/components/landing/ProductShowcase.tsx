import productDemoImg from "../../assets/product-demo.png";

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
        <div 
          className="lp-showcase-frame" 
          style={{ 
            background: "var(--lp-bg-2)", 
            borderColor: "var(--lp-border)",
            borderRadius: "16px",
            boxShadow: "var(--lp-shadow-lg)"
          }}
        >
          <div 
            className="lp-showcase-bar" 
            aria-hidden="true" 
            style={{ 
              background: "var(--lp-bg)", 
              borderBottom: "1px solid var(--lp-border)"
            }}
          >
            <div className="lp-showcase-dot lp-showcase-dot-r" />
            <div className="lp-showcase-dot lp-showcase-dot-y" />
            <div className="lp-showcase-dot lp-showcase-dot-g" />
            <div 
              className="lp-showcase-url" 
              style={{ 
                color: "var(--lp-text-2)", 
                background: "rgba(0,0,0,0.04)" 
              }}
            >
              rxclear.app/app
            </div>
          </div>

          <div 
            className="lp-showcase-content" 
            style={{ 
              padding: 0,
              background: "var(--lp-bg)",
              display: "flex"
            }}
          >
            <img 
              src={productDemoImg} 
              alt="RXCLEAR product demonstration"
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "contain",
                display: "block" 
              }} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
