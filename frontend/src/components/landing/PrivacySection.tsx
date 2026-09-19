export default function PrivacySection() {
  const items = [
    {
      icon: "⏱",
      title: "Prescription images auto-deleted after 24 hours",
      desc: "Uploaded prescription photos are stored in a private, encrypted S3 bucket and automatically deleted after one day. Your image is never used beyond analysis.",
    },
    {
      icon: "📂",
      title: "Analysis history cleared after 7 days",
      desc: "Submission records in DynamoDB are automatically expired through a 7-day TTL. No long-term storage of your prescription history.",
    },
    {
      icon: "📝",
      title: "Structured logging without prescription content",
      desc: "CloudWatch logs explicitly enforce PHI/PII safety rules. No image bytes, prescription content, or personal data are ever written to logs.",
    },
  ];

  return (
    <section
      id="privacy"
      className="lp-section"
      aria-labelledby="privacy-headline"
    >
      <div className="lp-container">
        <div className="lp-section-header">
          <span className="lp-eyebrow">Privacy</span>
          <h2
            id="privacy-headline"
            className="lp-display lp-display-md"
            style={{ maxWidth: "560px", marginTop: "16px", marginBottom: "12px" }}
          >
            Built with privacy in mind.
          </h2>
          <p className="lp-body-sm" style={{ maxWidth: "560px" }}>
            Prescription data is sensitive. The RXCLEAR architecture is designed
            to minimise retention and exposure at every step.
          </p>
        </div>

        <div className="lp-privacy-grid">
          {items.map((item) => (
            <div key={item.title} className="lp-privacy-item">
              <span className="lp-privacy-icon" aria-hidden="true">{item.icon}</span>
              <h3 className="lp-privacy-title">{item.title}</h3>
              <p className="lp-privacy-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        <p style={{
          marginTop: "32px",
          fontSize: "0.8125rem",
          color: "var(--lp-text-2)",
          maxWidth: "640px",
          lineHeight: "1.6",
        }}>
          RXCLEAR does not claim HIPAA compliance, medical certification, or
          regulatory approval. Always consult a qualified medical professional or
          registered pharmacist before acting on any information in the application.
        </p>
      </div>
    </section>
  );
}
