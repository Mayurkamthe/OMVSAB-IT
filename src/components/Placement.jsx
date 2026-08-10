const products = [
  {
    title: "College ERP",
    subtitle: "Applications",
    desc: "Multi-role academic ERP covering admissions, attendance, exams, fee management, timetable, and parent dashboards.",
    stack: ["Java", "React", "MySQL"],
    gradient: "from-blue-500 to-indigo-600",
    icon: <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>,
  },
  {
    title: "Fitness Club",
    subtitle: "ERP",
    desc: "Complete gym management system with biometric attendance, billing, member tracking, and WhatsApp integration.",
    stack: ["Node.js", "MySQL", "React"],
    gradient: "from-orange-500 to-red-500",
    icon: <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
  },
  {
    title: "GST Bill",
    subtitle: "Software",
    desc: "Automated GST billing, invoicing, and tax reporting software built for Indian SMEs and retail businesses.",
    stack: [".NET", "SQL Server", "Reports"],
    gradient: "from-emerald-500 to-teal-600",
    icon: <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
  },
  {
    title: "Construction",
    subtitle: "ERP",
    desc: "End-to-end project tracking, material management, labour records, and billing for construction companies.",
    stack: ["Java", "MySQL", "Android"],
    gradient: "from-purple-500 to-violet-600",
    icon: <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  },
];

const clients = [
  { name: "Kukadi Sugar", color: "border-blue-200 hover:border-blue-400 hover:bg-blue-50" },
  { name: "Imperial Forge", color: "border-orange-200 hover:border-orange-400 hover:bg-orange-50" },
  { name: "KAS", color: "border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50" },
  { name: "Silvolite", color: "border-purple-200 hover:border-purple-400 hover:bg-purple-50" },
  { name: "Assured Valuers", color: "border-teal-200 hover:border-teal-400 hover:bg-teal-50" },
  { name: "Suryaprakash", color: "border-rose-200 hover:border-rose-400 hover:bg-rose-50" },
  { name: "College ERP", color: "border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50" },
  { name: "Sanjivani", color: "border-amber-200 hover:border-amber-400 hover:bg-amber-50" },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Products */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block bg-purple-50 text-purple-600 border border-purple-100 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">Our Products</span>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-secondary mb-4">
            Ready-to-Deploy <span className="gradient-text-blue">Software Products</span>
          </h2>
          <p className="text-gray-500 leading-relaxed">Battle-tested products for Indian businesses — deployable and customizable for your organization.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {products.map((p) => (
            <div key={p.title} className="group relative rounded-2xl overflow-hidden border border-gray-100 card-hover bg-white">
              {/* Gradient header */}
              <div className={`bg-gradient-to-br ${p.gradient} p-6`}>
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-4">{p.icon}</div>
                <h3 className="font-heading font-bold text-white text-lg leading-tight">{p.title}<br /><span className="font-normal opacity-80 text-base">{p.subtitle}</span></h3>
              </div>
              {/* Body */}
              <div className="p-5">
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.stack.map((t) => (
                    <span key={t} className="text-xs bg-gray-50 text-gray-500 px-2.5 py-0.5 rounded border border-gray-100 font-medium">{t}</span>
                  ))}
                </div>
                <a href="#contact" className="text-primary text-xs font-semibold hover:underline">Enquire Now →</a>
              </div>
            </div>
          ))}
        </div>

        {/* Clients */}
        <div className="bg-gray-50 rounded-3xl p-8 sm:p-12 border border-gray-100">
          <div className="text-center mb-10">
            <span className="inline-block bg-emerald-50 text-emerald-600 border border-emerald-100 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">Our Clients</span>
            <h3 className="font-heading font-bold text-2xl lg:text-3xl text-secondary mb-2">
              Trusted by Businesses Across Industries
            </h3>
            <p className="text-gray-500 text-sm">Omvsab IT Solution provides software products to our valued clients.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {clients.map((c) => (
              <div key={c.name} className={`bg-white border-2 rounded-2xl py-6 px-4 flex items-center justify-center transition-all duration-200 cursor-default ${c.color}`}>
                <span className="font-heading font-bold text-secondary text-sm text-center">{c.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
