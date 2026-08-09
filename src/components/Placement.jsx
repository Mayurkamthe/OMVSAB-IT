// Portfolio: Real Products + Real Clients
const products = [
  {
    title: "College ERP Applications",
    desc: "Multi-role academic ERP covering admissions, attendance, exams, fee management, timetable, and parent dashboards.",
    stack: ["Java", "React", "MySQL"],
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    title: "Fitness Club ERP",
    desc: "Complete gym management system with biometric attendance, billing, member tracking, and WhatsApp integration.",
    stack: ["Node.js", "MySQL", "React"],
    color: "bg-orange-50 text-primary border-orange-100",
  },
  {
    title: "GST Bill Software",
    desc: "Automated GST billing, invoicing, and tax reporting software built for Indian SMEs and retail businesses.",
    stack: [".NET", "SQL Server", "Crystal Reports"],
    color: "bg-green-50 text-green-600 border-green-100",
  },
  {
    title: "Construction ERP",
    desc: "End-to-end project tracking, material management, labour records, and billing for construction companies.",
    stack: ["Java", "MySQL", "Android"],
    color: "bg-red-50 text-red-600 border-red-100",
  },
];

const clients = [
  "Kukadi Sugar",
  "Imperial Forge",
  "KAS",
  "Silvolite",
  "Assured Valuers",
  "Suryaprakash",
  "College ERP",
  "Sanjivani",
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Products */}
        <div className="max-w-2xl mb-12">
          <div className="text-primary font-semibold text-xs uppercase tracking-widest mb-4">Our Products</div>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-secondary mb-4 leading-snug">
            Ready-to-Deploy Software Products
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Battle-tested software products built for Indian businesses — deployable and customizable for your organization.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {products.map((p) => (
            <div key={p.title} className={`rounded-xl border p-6 hover:shadow-md transition-all duration-200 ${p.color}`}>
              <h3 className="font-heading font-bold text-base mb-3">{p.title}</h3>
              <p className="text-sm leading-relaxed opacity-80 mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.stack.map((t) => (
                  <span key={t} className="text-xs bg-white bg-opacity-60 px-2 py-0.5 rounded font-medium">{t}</span>
                ))}
              </div>
              <a href="#contact" className="text-xs font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity">
                Enquire Now →
              </a>
            </div>
          ))}
        </div>

        {/* Clients */}
        <div className="border-t border-gray-100 pt-14">
          <div className="text-center mb-10">
            <div className="text-primary font-semibold text-xs uppercase tracking-widest mb-3">Our Clients</div>
            <h3 className="font-heading font-bold text-2xl lg:text-3xl text-secondary mb-2">
              Trusted by Businesses Across Industries
            </h3>
            <p className="text-gray-500 text-sm">Omvsab IT Solution provides software products to our valued clients.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {clients.map((c) => (
              <div key={c} className="bg-gray-50 border border-gray-100 rounded-xl py-6 px-4 flex items-center justify-center hover:border-orange-200 hover:shadow-sm transition-all duration-200">
                <span className="font-heading font-semibold text-secondary text-sm text-center">{c}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
