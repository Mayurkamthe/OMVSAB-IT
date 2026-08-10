const reasons = [
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    title: "Senior Engineers, Not Juniors",
    desc: "Every project handled by developers with 4–8 years of field experience. No outsourcing after the sale.",
    stat: "4–8 yrs", statLabel: "Avg. Experience",
    from: "#F7931A", to: "#ef4444",
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: "On-Time Delivery",
    desc: "We've maintained a 96% on-time delivery rate across 200+ projects. Deadlines aren't suggestions for us.",
    stat: "96%", statLabel: "On-Time Rate",
    from: "#2563EB", to: "#7C3AED",
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
    title: "Direct Communication",
    desc: "You talk directly to the developers building your product — not account managers relaying messages.",
    stat: "24hr", statLabel: "Response Time",
    from: "#7C3AED", to: "#ec4899",
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    title: "Clean, Documented Code",
    desc: "Full documentation, Git history, and knowledge transfer included. Code you can maintain yourself.",
    stat: "100%", statLabel: "Documented",
    from: "#059669", to: "#0891B2",
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    title: "Built to Scale",
    desc: "Architecture decisions that work today and grow with you. No MVPs that fall apart in 6 months.",
    stat: "200+", statLabel: "Projects Scaled",
    from: "#0891B2", to: "#2563EB",
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    title: "Transparent Pricing",
    desc: "Fixed-scope quotes with no hidden fees. You know exactly what you're getting before we start.",
    stat: "₹0", statLabel: "Hidden Charges",
    from: "#e11d48", to: "#F7931A",
  },
];

export default function WhyUs() {
  return (
    <section id="why" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 section-pattern opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border"
            style={{ background: "linear-gradient(135deg,#fff7ed,#fef3c7)", color: "#b45309", borderColor: "#fde68a" }}>
            Why Choose Us
          </span>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-secondary mb-4">
            Why Clients Choose{" "}
            <span style={{ background: "linear-gradient(135deg,#F7931A,#ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              OMVSAB
            </span>{" "}
            Over Larger Agencies
          </h2>
          <p className="text-gray-500 leading-relaxed">Big enough to handle complex projects. Small enough to actually care about yours.</p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover"
            >
              {/* Gradient top strip */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{ background: `linear-gradient(90deg, ${r.from}, ${r.to})` }}
              />

              {/* Glow blob */}
              <div
                className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-[0.08] blur-xl group-hover:opacity-[0.14] transition-opacity duration-300"
                style={{ background: `linear-gradient(135deg, ${r.from}, ${r.to})` }}
              />

              <div className="p-7 relative z-10">
                {/* Icon + Stat row */}
                <div className="flex items-start justify-between mb-5">
                  {/* Icon circle */}
                  <div
                    className="w-13 h-13 rounded-2xl flex items-center justify-center text-white shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${r.from}, ${r.to})`,
                      width: "52px", height: "52px",
                    }}
                  >
                    {r.icon}
                  </div>

                  {/* Stat badge */}
                  <div className="text-right">
                    <div
                      className="font-heading font-bold text-xl leading-tight"
                      style={{ background: `linear-gradient(135deg, ${r.from}, ${r.to})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                    >
                      {r.stat}
                    </div>
                    <div className="text-gray-400 text-xs">{r.statLabel}</div>
                  </div>
                </div>

                <h4 className="font-heading font-bold text-secondary text-base mb-2">{r.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
              </div>

              {/* Bottom hover line */}
              <div
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                style={{ background: `linear-gradient(90deg, ${r.from}, ${r.to})` }}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div
          className="mt-14 rounded-3xl p-8 sm:p-10 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #2d1a0e 50%, #1A1A1A 100%)" }}
        >
          <div className="absolute inset-0 dark-pattern" />
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-20"
            style={{ background: "radial-gradient(circle, #F7931A, transparent)" }} />
          <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full blur-3xl opacity-10"
            style={{ background: "radial-gradient(circle, #2563EB, transparent)" }} />

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <div className="font-heading font-bold text-white text-xl mb-1">
                Ready to work with a team that delivers?
              </div>
              <div className="text-gray-400 text-sm">Get a free project estimate — we respond within 24 hours.</div>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="#contact"
                className="shrink-0 text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-lg inline-flex items-center gap-2"
                style={{ background: "linear-gradient(135deg, #F7931A, #ef4444)", boxShadow: "0 8px 24px rgba(247,147,26,0.35)" }}
              >
                Get Free Estimate
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="tel:+919881681839"
                className="shrink-0 border border-white border-opacity-20 text-white px-7 py-3.5 rounded-xl font-semibold text-sm hover:border-primary hover:text-primary transition-all inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
