export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Upload",
      desc: "Take a photo of your prescription or select one of the sample prescriptions to get started.",
    },
    {
      num: "02",
      title: "Understand",
      desc: "RXCLEAR extracts medicines, dosages, timing, and your doctor's specific directions — all in a readable format.",
    },
    {
      num: "03",
      title: "Act",
      desc: "Mark unavailable medicines to surface bio-equivalent alternatives, and access direct pharmacy links for every option.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="lp-section lp-section-alt"
      aria-labelledby="hiw-headline"
    >
      <div className="lp-container">
        <div className="lp-section-header" style={{ textAlign: "center" }}>
          <span className="lp-eyebrow">How it works</span>
          <h2
            id="hiw-headline"
            className="lp-display lp-display-md"
            style={{ marginTop: "16px", marginBottom: 0 }}
          >
            Three steps from prescription to clarity.
          </h2>
        </div>

        <ol className="lp-steps" aria-label="RXCLEAR steps">
          {steps.map((step) => (
            <li key={step.num} className="lp-step" style={{ listStyle: "none" }}>
              <div className="lp-step-num" aria-hidden="true">{step.num}</div>
              <div className="lp-step-body">
                <h3 className="lp-step-title">{step.title}</h3>
                <p className="lp-step-desc">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
