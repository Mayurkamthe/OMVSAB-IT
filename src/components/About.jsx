const TrophyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const GraduationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
);

const HandshakeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const BoltIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export default function About() {
  const highlights = [
    { icon: <TrophyIcon />, title: "Industry Experience", desc: "5+ years delivering enterprise-grade IT solutions across multiple domains." },
    { icon: <GraduationIcon />, title: "Education Focus", desc: "Bridging the gap between academic knowledge and real-world industry requirements." },
    { icon: <HandshakeIcon />, title: "Corporate Tie-ups", desc: "Strong partnerships with MNCs for direct placement and project opportunities." },
    { icon: <BoltIcon />, title: "Modern Tech Stack", desc: "Training on latest technologies that are in high demand in the industry." },
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
                <div className="w-10 h-10 bg-orange-50 text-primary rounded-lg flex items-center justify-center mb-3">
                  {h.icon}
                </div>
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
