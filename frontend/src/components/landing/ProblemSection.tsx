export default function ProblemSection() {
  const problems = [
    {
      num: "01",
      title: "Hard-to-read doctor directions",
      desc: "Doctor handwriting, unfamiliar drug names, and unexplained schedules leave patients guessing. Morning, afternoon, night — before or after meals? The prescription rarely makes it clear.",
    },
    {
      num: "02",
      title: "Medicine availability issues",
      desc: "When a prescribed brand isn't in stock at the local pharmacy, most patients don't know what a safe equivalent looks like. Searching online means comparing chemical names you've never encountered.",
    },
    {
      num: "03",
      title: "Online ordering friction",
      desc: "Looking up long drug names on pharmacy apps is slow and error-prone. A slight misspelling returns nothing. There's no direct bridge from prescription to pharmacy cart.",
    },
  ];

  return (
    <section
      id="problem"
      className="lp-section"
      aria-labelledby="problem-headline"
    >
      <div className="lp-container">
        <div className="lp-section-header">
          <span className="lp-eyebrow">The problem</span>
          <h2
            id="problem-headline"
            className="lp-display lp-display-md"
            style={{ maxWidth: "640px", marginTop: "16px", marginBottom: 0 }}
          >
            Prescriptions shouldn't require a second translation.
          </h2>
        </div>

        <div className="lp-problem-grid" role="list">
          {problems.map((p) => (
            <article key={p.num} className="lp-problem-item" role="listitem">
              <div className="lp-problem-num" aria-hidden="true">{p.num}</div>
              <h3 className="lp-problem-title">{p.title}</h3>
              <p className="lp-problem-desc">{p.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
