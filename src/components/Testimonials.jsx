const testimonials = [
  { name: "Rajesh Mehta", role: "Founder", company: "FitZone Gyms", text: "OMVSAB built our entire gym management platform from scratch — attendance, billing, member tracking. It's been running flawlessly for 2 years. They understood our business better than we expected.", avatar: "RM", color: "from-orange-500 to-red-500" },
  { name: "Dr. Sunita Patil", role: "Director", company: "Aparaitech College", text: "We came for a student portal and got a full ERP — attendance, fees, exam results. Professional, responsive, and delivered exactly as promised.", avatar: "SP", color: "from-blue-500 to-indigo-600" },
  { name: "Vikram Nair", role: "CTO", company: "RetailEdge", text: "We needed a scalable e-commerce backend for traffic spikes. OMVSAB designed the architecture properly. Six months in, zero downtime, excellent performance.", avatar: "VN", color: "from-emerald-500 to-teal-600" },
  { name: "Anand Kulkarni", role: "Operations Head", company: "MediSense", text: "Real-time vitals monitoring with hardware sensors, live dashboards, mobile access — delivered in 3 months. The technical depth of this team is impressive.", avatar: "AK", color: "from-purple-500 to-violet-600" },
  { name: "Prerna Shah", role: "Product Manager", company: "LogiTrack", text: "Weekly demos, honest updates, and a final product that matched our spec exactly. Communication was outstanding. Will definitely work with them again.", avatar: "PS", color: "from-teal-500 to-cyan-600" },
  { name: "Mohammed Iqbal", role: "CEO", company: "PropConnect", text: "Web app and mobile app handled by one team with React and React Native — consistent UI, no coordination headaches. Delivered ahead of schedule.", avatar: "MI", color: "from-rose-500 to-pink-600" },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-white section-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block bg-rose-50 text-rose-600 border border-rose-100 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">Client Feedback</span>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-secondary mb-4">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-gray-500 leading-relaxed">Feedback from business owners and product teams who've shipped real products with us.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="group bg-white rounded-2xl border border-gray-100 card-hover overflow-hidden flex flex-col">
              {/* Top color bar */}
              <div className={`h-1.5 bg-gradient-to-r ${t.color}`} />
              <div className="p-7 flex flex-col flex-1">
                <div className="text-5xl text-gray-100 font-serif leading-none mb-3 select-none">"</div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">{t.text}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-secondary text-sm">{t.name}</div>
                    <div className="text-gray-400 text-xs">{t.role}</div>
                    <div className="text-xs font-semibold" style={{ background: "linear-gradient(135deg, #F7931A, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t.company}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
