const testimonials = [
  {
    name: "Rajesh Mehta",
    role: "Founder, FitZone Gyms",
    company: "Fitness Industry",
    text: "OMVSAB built our entire gym management platform from scratch — attendance, billing, member tracking. It's been running flawlessly for 2 years. They understood our business better than we expected a dev team to.",
    avatar: "RM",
  },
  {
    name: "Dr. Sunita Patil",
    role: "Director, Aparaitech College",
    company: "Education Sector",
    text: "We approached OMVSAB for a student portal and ended up with a full ERP system — attendance, fees, exam results. The team was professional, responsive, and delivered exactly what they promised.",
    avatar: "SP",
  },
  {
    name: "Vikram Nair",
    role: "CTO, RetailEdge",
    company: "E-Commerce",
    text: "We needed a scalable e-commerce backend that could handle traffic spikes. The OMVSAB team designed the architecture properly. Six months in, zero downtime, and performance is excellent.",
    avatar: "VN",
  },
  {
    name: "Anand Kulkarni",
    role: "Operations Head, MediSense",
    company: "Healthcare IoT",
    text: "Real-time vitals monitoring with hardware sensors, live dashboards, mobile access — what seemed complex was delivered in 3 months. The technical depth of this team is impressive.",
    avatar: "AK",
  },
  {
    name: "Prerna Shah",
    role: "Product Manager, LogiTrack",
    company: "Logistics",
    text: "What stood out was how clearly they communicated. Weekly demos, honest updates when things got complex, and a final product that matched our spec. Will definitely work with them again.",
    avatar: "PS",
  },
  {
    name: "Mohammed Iqbal",
    role: "CEO, PropConnect",
    company: "Real Estate",
    text: "Our property listing platform needed both a web app and a mobile app. OMVSAB handled both using React and React Native — consistent UI, one team, no coordination headaches. Very happy.",
    avatar: "MI",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="text-primary font-semibold text-xs uppercase tracking-widest mb-4">Client Feedback</div>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-secondary mb-4 leading-snug">
            What Our Clients Say
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Feedback from business owners and product teams who've shipped real products with us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-xl p-6 border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all duration-200 flex flex-col">
              {/* Quote mark */}
              <div className="text-4xl text-gray-100 font-serif leading-none mb-3 select-none">"</div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">{t.text}</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-bold text-xs shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-heading font-semibold text-secondary text-sm">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.role}</div>
                  <div className="text-primary text-xs font-medium">{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
