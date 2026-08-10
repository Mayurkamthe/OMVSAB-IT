const steps = [
  { num: "01", title: "Discovery & Scoping", desc: "Detailed call to understand your requirements, goals, and constraints. We document everything and provide a clear project scope and timeline.", color: "from-orange-500 to-amber-500", light: "bg-orange-50", text: "text-orange-600" },
  { num: "02", title: "Design & Architecture", desc: "Designers create wireframes and UI prototypes. Architects plan system structure, database schema, and API design before writing a single line of code.", color: "from-blue-500 to-indigo-500", light: "bg-blue-50", text: "text-blue-600" },
  { num: "03", title: "Agile Development", desc: "We build in 2-week sprints with regular demos. You stay in the loop through a shared project board and direct communication with the dev team.", color: "from-purple-500 to-violet-500", light: "bg-purple-50", text: "text-purple-600" },
  { num: "04", title: "Testing & QA", desc: "Every feature goes through unit testing, integration testing, and manual QA. We don't ship until it's production-ready.", color: "from-emerald-500 to-teal-500", light: "bg-emerald-50", text: "text-emerald-600" },
  { num: "05", title: "Deployment & Launch", desc: "We handle server setup, CI/CD pipelines, SSL, backups, and go-live. Your product launches smoothly with zero downtime.", color: "from-teal-500 to-cyan-500", light: "bg-teal-50", text: "text-teal-600" },
  { num: "06", title: "Support & Maintenance", desc: "Post-launch, we provide ongoing support, bug fixes, performance monitoring, and feature updates as your business grows.", color: "from-rose-500 to-pink-500", light: "bg-rose-50", text: "text-rose-600" },
];

export default function Process() {
  return (
    <section id="process" className="py-16 sm:py-24 bg-gray-50 section-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block bg-teal-50 text-teal-600 border border-teal-100 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">How We Work</span>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-secondary mb-4">
            A Process Designed Around <span className="gradient-text">Your Success</span>
          </h2>
          <p className="text-gray-500 leading-relaxed">No surprises, no handoffs to juniors. Our structured process keeps you informed from kick-off to launch.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {steps.map((s) => (
            <div key={s.num} className="group bg-white rounded-2xl p-7 border border-gray-100 card-hover relative overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.color}`} />
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${s.color} rounded-xl flex items-center justify-center shrink-0`}>
                  <span className="text-white font-heading font-bold text-sm">{s.num}</span>
                </div>
                <h4 className="font-heading font-semibold text-secondary text-base leading-snug pt-1">{s.title}</h4>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="relative bg-secondary rounded-3xl px-8 py-10 overflow-hidden">
          <div className="absolute inset-0 dark-pattern" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-10 rounded-full translate-x-20 -translate-y-20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-DEFAULT opacity-10 rounded-full -translate-x-16 translate-y-16 blur-3xl" />
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="font-heading font-bold text-white text-xl mb-2">Ready to build your product?</div>
              <div className="text-gray-400 text-sm">We'll respond within 24 hours with a detailed project brief.</div>
            </div>
            <a href="#contact" className="shrink-0 bg-primary text-white px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-orange-500 transition-all shadow-lg shadow-orange-500/30 inline-flex items-center gap-2">
              Get a Free Estimate
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
