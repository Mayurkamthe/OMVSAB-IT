// Repurposed: How We Work / Process section
const steps = [
  {
    num: "01",
    title: "Discovery & Scoping",
    desc: "We start with a detailed call to understand your requirements, goals, and constraints. We document everything and provide a clear project scope and timeline.",
  },
  {
    num: "02",
    title: "Design & Architecture",
    desc: "Our designers create wireframes and UI prototypes. Our architects plan the system structure, database schema, and API design before writing a single line of code.",
  },
  {
    num: "03",
    title: "Agile Development",
    desc: "We build in 2-week sprints with regular demos. You stay in the loop through a shared project board and direct communication with the development team.",
  },
  {
    num: "04",
    title: "Testing & QA",
    desc: "Every feature goes through unit testing, integration testing, and manual QA. We don't ship until it's production-ready.",
  },
  {
    num: "05",
    title: "Deployment & Launch",
    desc: "We handle server setup, CI/CD pipelines, SSL, backups, and go-live. Your product launches smoothly with zero downtime.",
  },
  {
    num: "06",
    title: "Support & Maintenance",
    desc: "Post-launch, we provide ongoing support, bug fixes, performance monitoring, and feature updates as your business grows.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="text-primary font-semibold text-xs uppercase tracking-widest mb-4">How We Work</div>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-secondary mb-4 leading-snug">
            A Process Designed Around Your Success
          </h2>
          <p className="text-gray-500 leading-relaxed">
            No surprises, no handoffs to juniors. Our structured process keeps you informed and in control from kick-off to launch.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((s) => (
            <div key={s.num} className="bg-white rounded-xl p-6 border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all duration-200">
              <div className="font-heading font-bold text-3xl text-gray-100 mb-4 leading-none">{s.num}</div>
              <h4 className="font-heading font-semibold text-secondary text-base mb-2">{s.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-12 bg-secondary rounded-2xl px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-heading font-bold text-white text-lg mb-1">Ready to build your product?</div>
            <div className="text-gray-400 text-sm">We'll respond within 24 hours with a detailed project brief.</div>
          </div>
          <a href="#contact" className="shrink-0 bg-primary text-white px-7 py-3 rounded-md font-semibold text-sm hover:bg-orange-600 transition-colors inline-flex items-center gap-2">
            Get a Free Estimate
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
