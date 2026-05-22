export default function About() {
  const highlights = [
    { icon: "🏆", title: "Industry Experience", desc: "5+ years delivering enterprise-grade IT solutions across multiple domains." },
    { icon: "🎓", title: "Education Focus", desc: "Bridging the gap between academic knowledge and real-world industry requirements." },
    { icon: "🤝", title: "Corporate Tie-ups", desc: "Strong partnerships with MNCs for direct placement and project opportunities." },
    { icon: "⚡", title: "Modern Tech Stack", desc: "Training on latest technologies that are in high demand in the industry." },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-4">
              About OMVSAB
            </div>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-secondary mb-6">
              Empowering Careers & Businesses Through Technology
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              OMVSAB IT Solutions is a forward-thinking IT company dedicated to delivering custom software solutions 
              and empowering the next generation of technology professionals through structured internship programs.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Founded with a mission to bridge the gap between education and industry, we work closely with 
              students, startups, and enterprises to build robust digital products and develop skilled IT professionals 
              ready for the corporate world.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="#services"
                className="bg-primary text-white px-6 py-3 rounded-md font-semibold text-sm hover:bg-orange-600 transition-colors"
              >
                Our Services
              </a>
              <a href="#internship" className="text-primary font-semibold text-sm hover:underline inline-flex items-center gap-1">
                Internship Program
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Grid */}
          <div className="grid grid-cols-2 gap-5">
            {highlights.map((h) => (
              <div key={h.title} className="bg-white rounded-xl p-6 border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all duration-200">
                <div className="text-2xl mb-3">{h.icon}</div>
                <h4 className="font-heading font-semibold text-secondary text-sm mb-2">{h.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
