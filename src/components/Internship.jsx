const GlobeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const CodeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const BrushIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
  </svg>
);

export default function Internship() {
  const features = [
    { num: "01", title: "Live Project Training", desc: "Work on real client projects from day one under expert guidance." },
    { num: "02", title: "Industry Mentorship", desc: "Dedicated mentors with 5+ years of professional experience." },
    { num: "03", title: "Internship Certificate", desc: "Recognized certificate to strengthen your professional profile." },
    { num: "04", title: "Placement Guidance", desc: "Resume building, mock interviews, and direct MNC referrals." },
    { num: "05", title: "Practical Learning", desc: "Hands-on coding, deployment, and project management skills." },
    { num: "06", title: "Modern Tech Stack", desc: "Learn React, Node.js, Spring Boot, AWS, and more in-demand tools." },
  ];

  const tracks = [
    { name: "Full Stack Web Development", duration: "3 Months", icon: <GlobeIcon /> },
    { name: "Mobile App Development", duration: "3 Months", icon: <PhoneIcon /> },
    { name: "Java Backend Development", duration: "2 Months", icon: <CodeIcon /> },
    { name: "UI/UX Design", duration: "2 Months", icon: <BrushIcon /> },
  ];

  return (
    <section id="internship" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Internship Program
          </div>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-secondary mb-4">
            Launch Your IT Career With Us
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Our structured internship program is designed to transform fresh graduates into industry-ready
            professionals through hands-on project experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Features */}
          <div className="grid sm:grid-cols-2 gap-5">
            {features.map((f) => (
              <div key={f.num} className="bg-white rounded-xl p-5 border border-gray-100 hover:border-orange-200 transition-all duration-200">
                <div className="font-heading font-bold text-primary text-2xl mb-2">{f.num}</div>
                <h4 className="font-heading font-semibold text-secondary text-sm mb-2">{f.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Tracks */}
          <div>
            <h3 className="font-heading font-semibold text-secondary text-xl mb-6">Available Training Tracks</h3>
            <div className="space-y-4 mb-8">
              {tracks.map((t) => (
                <div key={t.name} className="bg-white rounded-xl p-5 border border-gray-100 flex items-center justify-between group hover:border-orange-200 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-50 text-primary rounded-lg flex items-center justify-center shrink-0">
                      {t.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-secondary text-sm">{t.name}</div>
                      <div className="text-gray-400 text-xs mt-0.5">Duration: {t.duration}</div>
                    </div>
                  </div>
                  <span className="text-xs bg-orange-50 text-primary px-3 py-1.5 rounded-full font-medium">
                    Enroll Now
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Box */}
            <div className="bg-secondary rounded-2xl p-7 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-20 rounded-full -translate-y-10 translate-x-10" />
              <h4 className="font-heading font-bold text-xl mb-2 relative z-10">Ready to Start?</h4>
              <p className="text-gray-400 text-sm mb-5 relative z-10">
                Apply for our next batch and take the first step towards your IT career.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md font-semibold text-sm hover:bg-orange-600 transition-colors relative z-10"
              >
                Apply for Internship
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
