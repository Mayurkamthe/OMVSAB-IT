export default function WhyUs() {
  const points = [
    {
      icon: "👨‍💼",
      title: "Experienced Team",
      desc: "Our team consists of seasoned professionals with 5–10 years of industry experience across diverse technology domains.",
    },
    {
      icon: "🏭",
      title: "Industry-Level Training",
      desc: "Training methodologies aligned with real corporate environments, preparing you for immediate contribution on the job.",
    },
    {
      icon: "💰",
      title: "Affordable Programs",
      desc: "Quality education shouldn't be expensive. Our programs are priced to be accessible for every student.",
    },
    {
      icon: "🚀",
      title: "Modern Technologies",
      desc: "Stay ahead with training in cutting-edge technologies that are actively sought by top hiring companies.",
    },
    {
      icon: "🎯",
      title: "Career Support",
      desc: "End-to-end career support including resume preparation, interview coaching, and placement assistance.",
    },
    {
      icon: "📋",
      title: "Structured Curriculum",
      desc: "Carefully designed curriculum based on industry feedback, updated quarterly to reflect the latest trends.",
    },
  ];

  return (
    <section id="why" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Why OMVSAB
          </div>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-white mb-4">
            Why Choose Us?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We go beyond just training — we build careers and deliver real solutions that make an impact.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((p) => (
            <div
              key={p.title}
              className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-xl p-6 hover:border-primary hover:border-opacity-50 transition-all duration-200 group"
            >
              <div className="text-3xl mb-4">{p.icon}</div>
              <h4 className="font-heading font-semibold text-white text-base mb-3">{p.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-md font-semibold text-sm hover:bg-orange-600 transition-colors"
          >
            Start Your Journey Today
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
