export default function TrustStrip() {
  const items = [
    {
      icon: "📋",
      title: "Prescription clarity",
      desc: "Doctor directions decoded into plain language",
    },
    {
      icon: "🔄",
      title: "Medicine alternatives",
      desc: "Equivalent substitutes when your medicine is unavailable",
    },
    {
      icon: "🛒",
      title: "Direct pharmacy access",
      desc: "1-click links to Tata 1mg, PharmEasy, Apollo & Netmeds",
    },
    {
      icon: "🔒",
      title: "Privacy-conscious design",
      desc: "Images expire in 24h. Records cleared after 7 days",
    },
  ];

  return (
    <div className="lp-trust" aria-label="Key features">
      <div className="lp-trust-inner">
        {items.map((item) => (
          <div key={item.title} className="lp-trust-item">
            <div className="lp-trust-icon" aria-hidden="true">{item.icon}</div>
            <div className="lp-trust-text">
              <strong>{item.title}</strong>
              <span>{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
