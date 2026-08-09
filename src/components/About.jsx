export default function About() {
  const milestones = [
    { year: "2019", event: "Founded in Pune with a team of 3 developers" },
    { year: "2021", event: "Expanded to mobile & cloud, crossed 50 clients" },
    { year: "2023", event: "Delivered 150+ projects across 8 industries" },
    { year: "2025", event: "200+ projects, 15+ tech experts, 50+ clients" },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* LEFT */}
          <div>
            <div className="text-primary font-semibold text-xs uppercase tracking-widest mb-4">About Us</div>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-secondary mb-5 leading-snug">
              A Software Company Built on Delivery, Not Promises.
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              OMVSAB IT Solutions is a Pune-based software development company. Since 2019, we've partnered with startups, SMEs, and enterprises across India to design and deliver production-ready digital products.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              We're not a large agency with slow processes. We're a focused team of engineers and designers who move fast, communicate clearly, and take full ownership of what we build.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8 py-6 border-t border-b border-gray-100">
              {[["200+", "Projects"], ["50+", "Clients"], ["5+", "Years"]].map(([val, lbl]) => (
                <div key={lbl}>
                  <div className="font-heading font-bold text-2xl text-primary">{val}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{lbl}</div>
                </div>
              ))}
            </div>

            <a href="#contact" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md font-semibold text-sm hover:bg-orange-600 transition-colors">
              Work With Us
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* RIGHT — Timeline */}
          <div>
            <div className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">Our Journey</div>
            <div className="relative border-l-2 border-gray-100 pl-8 space-y-8">
              {milestones.map((m, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[41px] w-4 h-4 bg-white border-2 border-primary rounded-full" />
                  <div className="text-primary font-heading font-bold text-sm mb-1">{m.year}</div>
                  <div className="text-secondary font-medium text-sm leading-relaxed">{m.event}</div>
                </div>
              ))}
              <div className="relative">
                <div className="absolute -left-[41px] w-4 h-4 bg-primary rounded-full border-2 border-primary" />
                <div className="text-primary font-heading font-bold text-sm mb-1">Today</div>
                <div className="text-secondary font-medium text-sm">Growing. Building. Delivering.</div>
              </div>
            </div>

            {/* Industries */}
            <div className="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-100">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Industries We Serve</div>
              <div className="flex flex-wrap gap-2">
                {["Healthcare", "Education", "E-Commerce", "Logistics", "Finance", "Real Estate", "Manufacturing", "Hospitality"].map((ind) => (
                  <span key={ind} className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full">
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
