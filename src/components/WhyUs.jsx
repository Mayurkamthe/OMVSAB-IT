const reasons = [
  { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>, title: "Senior Engineers, Not Juniors", desc: "Every project handled by developers with 4–8 years of field experience. No outsourcing after the sale.", color: "from-orange-500 to-amber-500", light: "bg-orange-50 border-orange-200" },
  { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: "On-Time Delivery", desc: "We've maintained a 96% on-time delivery rate across 200+ projects. Deadlines aren't suggestions.", color: "from-blue-500 to-indigo-500", light: "bg-blue-50 border-blue-200" },
  { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>, title: "Direct Communication", desc: "You talk directly to the developers building your product — not account managers relaying messages.", color: "from-purple-500 to-violet-500", light: "bg-purple-50 border-purple-200" },
  { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>, title: "Clean, Documented Code", desc: "Full documentation, Git history, and knowledge transfer included. Code you can maintain yourself.", color: "from-emerald-500 to-teal-500", light: "bg-emerald-50 border-emerald-200" },
  { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>, title: "Built to Scale", desc: "Architecture decisions that work today and grow with you. We don't build MVPs that fall apart in 6 months.", color: "from-teal-500 to-cyan-500", light: "bg-teal-50 border-teal-200" },
  { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, title: "Transparent Pricing", desc: "Fixed-scope quotes with no hidden fees. You know what you're getting and what it costs before we start.", color: "from-rose-500 to-pink-500", light: "bg-rose-50 border-rose-200" },
];

export default function WhyUs() {
  return (
    <section id="why" className="py-16 sm:py-24 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 dark-pattern" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-[0.05] rounded-full translate-x-32 -translate-y-32 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-DEFAULT opacity-[0.05] rounded-full -translate-x-32 translate-y-32 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block bg-white bg-opacity-10 text-gray-300 border border-white border-opacity-10 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">Why Us</span>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-white mb-4">
            Why Clients Choose <span className="text-primary">OMVSAB</span> Over Larger Agencies
          </h2>
          <p className="text-gray-400 leading-relaxed">Big enough to handle complex projects. Small enough to actually care about yours.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r) => (
            <div key={r.title} className={`group relative bg-white bg-opacity-5 border rounded-2xl p-6 card-hover overflow-hidden ${r.light}`}>
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${r.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
              <div className={`w-11 h-11 bg-gradient-to-br ${r.color} rounded-xl flex items-center justify-center mb-5 text-white shadow-lg`}>
                {r.icon}
              </div>
              <h4 className="font-heading font-semibold text-secondary text-sm mb-2">{r.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
