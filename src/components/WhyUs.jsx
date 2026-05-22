const UserGroupIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const BuildingIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const CurrencyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const RocketIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7l-3.182-3.182a4 4 0 00-5.657 5.657l3.182 3.182a4 4 0 005.657-5.657z" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ClipboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

export default function WhyUs() {
  const points = [
    { icon: <UserGroupIcon />, title: "Experienced Team", desc: "Our team consists of seasoned professionals with 5–10 years of industry experience across diverse technology domains." },
    { icon: <BuildingIcon />, title: "Industry-Level Training", desc: "Training methodologies aligned with real corporate environments, preparing you for immediate contribution on the job." },
    { icon: <CurrencyIcon />, title: "Affordable Programs", desc: "Quality education shouldn't be expensive. Our programs are priced to be accessible for every student." },
    { icon: <RocketIcon />, title: "Modern Technologies", desc: "Stay ahead with training in cutting-edge technologies that are actively sought by top hiring companies." },
    { icon: <BriefcaseIcon />, title: "Career Support", desc: "End-to-end career support including resume preparation, interview coaching, and placement assistance." },
    { icon: <ClipboardIcon />, title: "Structured Curriculum", desc: "Carefully designed curriculum based on industry feedback, updated quarterly to reflect the latest trends." },
  ];

  return (
    <section id="why" className="py-14 sm:py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
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
              <div className="w-11 h-11 bg-primary bg-opacity-20 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                {p.icon}
              </div>
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
