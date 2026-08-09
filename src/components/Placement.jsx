// Renamed: Portfolio / Projects section
const projects = [
  {
    name: "Gym Management System",
    industry: "Healthcare & Fitness",
    desc: "Full-stack system with biometric attendance, billing, member tracking, and WhatsApp integration for gym chains.",
    stack: ["Node.js", "MySQL", "React"],
    type: "Web App",
  },
  {
    name: "College ERP Portal",
    industry: "Education",
    desc: "Multi-role academic ERP covering admissions, attendance, exams, fee management, and parent dashboards.",
    stack: ["Spring Boot", "React", "PostgreSQL"],
    type: "Enterprise",
  },
  {
    name: "E-Commerce Platform",
    industry: "Retail",
    desc: "Scalable online store with inventory management, payment gateway, order tracking, and admin analytics.",
    stack: ["Next.js", "Node.js", "MongoDB"],
    type: "Web App",
  },
  {
    name: "IoT Health Monitor",
    industry: "Healthcare",
    desc: "Real-time patient vitals monitoring via ESP32 sensors with live dashboard, alerts, and mobile access.",
    stack: ["React", "Socket.io", "ESP32"],
    type: "IoT + Web",
  },
  {
    name: "Alumni Connect Portal",
    industry: "Education",
    desc: "Networking and event management platform for college alumni with payment integration and mobile-first UI.",
    stack: ["Node.js", "MongoDB", "EJS"],
    type: "Web App",
  },
  {
    name: "Water Quality Monitor",
    industry: "Environment / IoT",
    desc: "pH, TDS, and temperature monitoring system with WiFi config portal, Spring Boot backend, and mobile app.",
    stack: ["Spring Boot", "React Native", "ESP32"],
    type: "IoT + Mobile",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="text-primary font-semibold text-xs uppercase tracking-widest mb-4">Our Work</div>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-secondary mb-4 leading-snug">
            Real Products We've Shipped
          </h2>
          <p className="text-gray-500 leading-relaxed">
            A sample of the software we've built for clients across industries — from IoT systems to enterprise portals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p) => (
            <div key={p.name} className="group border border-gray-100 rounded-xl p-6 hover:border-orange-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs bg-orange-50 text-primary px-3 py-1 rounded-full font-medium">{p.type}</span>
                <span className="text-xs text-gray-400">{p.industry}</span>
              </div>
              <h3 className="font-heading font-semibold text-secondary text-base mb-2">{p.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-50">
                {p.stack.map((t) => (
                  <span key={t} className="text-xs bg-gray-50 text-gray-500 px-2.5 py-1 rounded border border-gray-100">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="#contact" className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 px-6 py-3 rounded-md text-sm font-semibold hover:border-primary hover:text-primary transition-colors">
            Discuss Your Project
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
