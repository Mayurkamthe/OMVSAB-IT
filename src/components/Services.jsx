const services = [
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    title: "Software Development",
    desc: "Custom enterprise software on Java, .NET, PHP — tailored to your exact business workflow.",
    tags: ["Java", ".NET", "PHP", "Spring Boot"],
    gradient: "from-orange-500 to-orange-600",
    bg: "bg-orange-50", border: "border-orange-100", text: "text-orange-600",
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>,
    title: "Web Design",
    desc: "Professional, responsive, brand-consistent websites built to convert visitors into customers.",
    tags: ["React", "HTML/CSS", "Tailwind", "Figma"],
    gradient: "from-blue-500 to-blue-700",
    bg: "bg-blue-50", border: "border-blue-100", text: "text-blue-600",
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
    title: "Android Applications",
    desc: "Native and cross-platform Android apps built for performance and seamless mobile experience.",
    tags: ["Android", "React Native", "Flutter", "Java"],
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50", border: "border-emerald-100", text: "text-emerald-600",
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" /></svg>,
    title: "Web Applications",
    desc: "Scalable, feature-rich portals and SaaS platforms — from ERP systems to multi-user dashboards.",
    tags: ["React", "Node.js", "MySQL", "REST APIs"],
    gradient: "from-purple-500 to-violet-600",
    bg: "bg-purple-50", border: "border-purple-100", text: "text-purple-600",
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    title: "SEO Marketing",
    desc: "Data-driven SEO strategies that increase online visibility and bring qualified business leads.",
    tags: ["SEO", "Google Analytics", "Content", "SEM"],
    gradient: "from-pink-500 to-rose-600",
    bg: "bg-rose-50", border: "border-rose-100", text: "text-rose-600",
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>,
    title: "Web Hosting",
    desc: "Reliable, secure hosting with uptime guarantees, SSL certificates, daily backups, and support.",
    tags: ["AWS", "cPanel", "SSL", "Domain"],
    gradient: "from-cyan-500 to-teal-500",
    bg: "bg-teal-50", border: "border-teal-100", text: "text-teal-600",
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    title: "IT Consulting",
    desc: "Technology audits, architecture advisory, and strategic IT planning to make the right decisions.",
    tags: ["Tech Audit", "Architecture", "Strategy", "Support"],
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-50", border: "border-amber-100", text: "text-amber-600",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 bg-white section-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <span className="inline-block bg-orange-50 text-primary border border-orange-100 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">Services</span>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-secondary mb-4">
            What We <span className="gradient-text">Build</span> for Our Clients
          </h2>
          <p className="text-gray-500 leading-relaxed">Full technology stack coverage — from design to deployment — one reliable team.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((s) => (
            <div key={s.title} className={`group relative bg-white border ${s.border} rounded-2xl p-6 card-hover cursor-default overflow-hidden`}>
              {/* Top color bar */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${s.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
              <div className={`w-12 h-12 ${s.bg} ${s.text} rounded-xl flex items-center justify-center mb-5`}>{s.icon}</div>
              <h3 className="font-heading font-semibold text-secondary text-sm mb-2">{s.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-4">{s.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span key={t} className={`text-xs ${s.bg} ${s.text} px-2.5 py-0.5 rounded-full font-medium border ${s.border}`}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
