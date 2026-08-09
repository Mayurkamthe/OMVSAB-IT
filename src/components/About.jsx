const vmv = [
  {
    title: "Vision",
    desc: "To partner with 1.6k SMEs & startups within South East Asia, Middle East & Africa.",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
  },
  {
    title: "Mission",
    desc: "To provide customized Software Solutions within affordable cost contributing towards digitalization.",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  },
  {
    title: "Values",
    desc: "Employee as an asset. Client Benefit Approach. Solution Oriented Open Communication. Adoption with new Technology.",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
  },
];

const techStack = ["Java", ".NET", "PHP", "Android", "React", "Node.js", "Spring Boot", "MySQL"];

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Top */}
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start mb-16">
          <div>
            <div className="text-primary font-semibold text-xs uppercase tracking-widest mb-4">About Us</div>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-secondary mb-5 leading-snug">
              15+ Years of Software Expertise in Pune
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              Omvsab IT Solution provides different software services and solutions. Located in Pune, India, we have expertise in different domains and are passionate about upgrading ourselves in new technologies.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Our long-term goal is to provide end-to-end service to our clients and ensure their satisfaction — from requirements gathering to deployment and beyond.
            </p>

            <div className="grid grid-cols-3 gap-6 py-6 border-t border-b border-gray-100 mb-8">
              {[["2008", "Est."], ["200+", "Projects"], ["50+", "Clients"]].map(([val, lbl]) => (
                <div key={lbl}>
                  <div className="font-heading font-bold text-2xl text-primary">{val}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{lbl}</div>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Core Technologies</div>
              <div className="flex flex-wrap gap-2">
                {techStack.map((t) => (
                  <span key={t} className="text-xs bg-orange-50 text-primary border border-orange-100 px-3 py-1.5 rounded-full font-medium">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Industries */}
          <div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">Industries We Serve</div>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {["Healthcare", "Education", "Manufacturing", "Logistics", "Finance / GST", "Real Estate", "Construction", "Fitness & Sports"].map((ind) => (
                <div key={ind} className="flex items-center gap-2.5 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                  {ind}
                </div>
              ))}
            </div>

            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Office</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Near State Bank Nagar, Sr.No 19/1/8,<br />Pune, Maharashtra, India
              </p>
              <div className="flex items-center gap-2 mt-3 text-sm text-primary font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 9881681839
              </div>
              <div className="flex items-center gap-2 mt-1.5 text-sm text-primary font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hr@omvsabitsolution.in
              </div>
            </div>
          </div>
        </div>

        {/* Vision Mission Values */}
        <div className="grid md:grid-cols-3 gap-5">
          {vmv.map((item) => (
            <div key={item.title} className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all">
              <div className="w-10 h-10 bg-primary bg-opacity-10 text-primary rounded-lg flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h4 className="font-heading font-bold text-secondary text-base mb-2 uppercase tracking-wide">{item.title}</h4>
              <div className="w-8 h-0.5 bg-primary rounded-full mb-3" />
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
