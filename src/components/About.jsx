const vmv = [
  {
    title: "Vision",
    desc: "To partner with 1.6k SMEs & startups within South East Asia, Middle East & Africa.",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
    gradient: "from-blue-500 to-indigo-600", light: "bg-blue-50", text: "text-blue-600",
  },
  {
    title: "Mission",
    desc: "To provide customized Software Solutions within affordable cost contributing towards digitalization.",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    gradient: "from-orange-500 to-red-500", light: "bg-orange-50", text: "text-orange-600",
  },
  {
    title: "Values",
    desc: "Employee as an asset · Client Benefit Approach · Solution Oriented Open Communication · New Technology Adoption.",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
    gradient: "from-purple-500 to-pink-500", light: "bg-purple-50", text: "text-purple-600",
  },
];

const stats = [
  { val: "2008", lbl: "Established", color: "text-primary" },
  { val: "200+", lbl: "Projects", color: "text-blue-DEFAULT" },
  { val: "50+", lbl: "Clients", color: "text-purple-DEFAULT" },
  { val: "8+", lbl: "Industries", color: "text-emerald-DEFAULT" },
];

const industries = ["Healthcare", "Education", "Manufacturing", "Logistics", "Finance / GST", "Real Estate", "Construction", "Fitness & Sports"];
const techStack = [
  { t: "Java", c: "bg-blue-50 text-blue-600 border-blue-100" },
  { t: ".NET", c: "bg-purple-50 text-purple-600 border-purple-100" },
  { t: "PHP", c: "bg-teal-50 text-teal-600 border-teal-100" },
  { t: "Android", c: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  { t: "React", c: "bg-orange-50 text-orange-600 border-orange-100" },
  { t: "Node.js", c: "bg-green-50 text-green-600 border-green-100" },
  { t: "Spring Boot", c: "bg-rose-50 text-rose-600 border-rose-100" },
  { t: "MySQL", c: "bg-amber-50 text-amber-600 border-amber-100" },
];

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block bg-blue-50 text-blue-600 border border-blue-100 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">About Us</span>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-secondary mb-4">
            15+ Years of <span className="gradient-text-blue">Software Expertise</span> in Pune
          </h2>
          <p className="text-gray-500 leading-relaxed">Omvsab IT Solution provides software services and solutions across multiple domains with a passion for new technologies.</p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {stats.map((s) => (
            <div key={s.lbl} className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm card-hover">
              <div className={`font-heading font-bold text-3xl mb-1 ${s.color}`}>{s.val}</div>
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">{s.lbl}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          {/* Left */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h3 className="font-heading font-semibold text-secondary text-xl mb-4">Who We Are</h3>
            <p className="text-gray-500 leading-relaxed mb-4">
              Omvsab IT Solution provides different software services and solutions. Located in Pune, India, we have expertise in different domains and are passionate about upgrading ourselves in new technologies.
            </p>
            <p className="text-gray-500 leading-relaxed mb-6">
              Our long-term goal is to provide end-to-end service to our clients and ensure their satisfaction — from requirements gathering to deployment and beyond.
            </p>
            <div className="mb-4">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Core Technologies</div>
              <div className="flex flex-wrap gap-2">
                {techStack.map(({ t, c }) => (
                  <span key={t} className={`text-xs border px-3 py-1.5 rounded-full font-medium ${c}`}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-4">
            {/* Industries */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Industries We Serve</div>
              <div className="grid grid-cols-2 gap-2">
                {industries.map((ind) => (
                  <div key={ind} className="flex items-center gap-2 text-sm text-gray-600 py-1">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />{ind}
                  </div>
                ))}
              </div>
            </div>
            {/* Contact card */}
            <div className="bg-secondary rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-10 rounded-full -translate-y-8 translate-x-8 blur-xl" />
              <div className="relative z-10">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Our Office</div>
                <p className="text-gray-300 text-sm mb-3">Near State Bank Nagar, Sr.No 19/1/8,<br />Pune, Maharashtra, India</p>
                <div className="flex flex-col gap-1.5">
                  <a href="tel:+919881681839" className="text-primary text-sm font-medium hover:text-orange-400 transition-colors">+91 9881681839</a>
                  <a href="mailto:hr@omvsabitsolution.in" className="text-primary text-sm font-medium hover:text-orange-400 transition-colors">hr@omvsabitsolution.in</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision Mission Values */}
        <div className="grid md:grid-cols-3 gap-5">
          {vmv.map((item) => (
            <div key={item.title} className="relative bg-white rounded-2xl p-7 border border-gray-100 card-hover overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient}`} />
              <div className={`w-11 h-11 ${item.light} ${item.text} rounded-xl flex items-center justify-center mb-5`}>{item.icon}</div>
              <h4 className="font-heading font-bold text-secondary text-base mb-1 uppercase tracking-wide">{item.title}</h4>
              <div className={`w-8 h-0.5 bg-gradient-to-r ${item.gradient} rounded-full mb-3`} />
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
