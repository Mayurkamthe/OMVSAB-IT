const services = [
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    title: "Custom Software Development",
    desc: "We build scalable, maintainable software tailored to your exact business workflow — no off-the-shelf compromises.",
    tags: ["React", "Node.js", "Spring Boot", "PostgreSQL"],
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" /></svg>,
    title: "Web Application Development",
    desc: "Fast, SEO-ready, responsive web apps and portals — from simple business sites to complex multi-user SaaS platforms.",
    tags: ["Next.js", "React", "Tailwind CSS", "REST APIs"],
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
    title: "Mobile App Development",
    desc: "Native-quality iOS and Android apps built with React Native and Flutter — one codebase, both platforms, full performance.",
    tags: ["React Native", "Flutter", "Android", "iOS"],
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>,
    title: "UI/UX Design",
    desc: "User research, wireframes, prototypes, and pixel-perfect interfaces. We design products people actually want to use.",
    tags: ["Figma", "User Research", "Prototyping", "Design Systems"],
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>,
    title: "Cloud & DevOps",
    desc: "Cloud architecture, CI/CD pipelines, containerization, and infrastructure management so your product runs reliably at any scale.",
    tags: ["AWS", "Docker", "GitHub Actions", "Nginx"],
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    title: "IT Consulting & Support",
    desc: "Technology audits, architecture reviews, team augmentation, and ongoing technical support for growing businesses.",
    tags: ["Tech Audit", "Architecture", "Support", "Consulting"],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="text-primary font-semibold text-xs uppercase tracking-widest mb-4">Services</div>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-secondary mb-4 leading-snug">
            What We Build for Our Clients
          </h2>
          <p className="text-gray-500 leading-relaxed">
            We cover the full technology stack — from design to deployment — so you can work with one team instead of five vendors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <div key={s.title} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md hover:border-orange-100 transition-all duration-200 group cursor-default">
              <div className="w-11 h-11 bg-orange-50 text-primary rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                {s.icon}
              </div>
              <h3 className="font-heading font-semibold text-secondary text-base mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span key={t} className="text-xs bg-gray-50 text-gray-500 px-2.5 py-1 rounded border border-gray-100">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
