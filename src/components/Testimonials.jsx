const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer at TCS",
    text: "OMVSAB's internship program was a turning point in my career. The live project experience and mentorship gave me confidence to crack interviews at top MNCs. Highly recommended for any fresher!",
    rating: 5,
    avatar: "RS",
  },
  {
    name: "Priya Deshmukh",
    role: "Frontend Developer at Infosys",
    text: "The training here is unlike any college course. We worked on actual client projects and learned how real software teams operate. The placement support team helped me land my dream job.",
    rating: 5,
    avatar: "PD",
  },
  {
    name: "Amit Kulkarni",
    role: "Full Stack Developer at Wipro",
    text: "I joined with basic programming knowledge and left as a full-stack developer. The curriculum is updated, the mentors are patient, and the learning environment is truly professional.",
    rating: 5,
    avatar: "AK",
  },
  {
    name: "Sneha Patil",
    role: "Mobile Developer at Capgemini",
    text: "From day one, we were involved in real development work. The React Native module was extremely practical and helped me specialize in mobile development. OMVSAB sets high standards.",
    rating: 5,
    avatar: "SP",
  },
  {
    name: "Kiran Joshi",
    role: "Backend Engineer at HCL",
    text: "The Java Spring Boot training at OMVSAB is top-notch. I went from a beginner to building REST APIs and microservices in just 3 months. The interview preparation sessions were incredibly helpful.",
    rating: 5,
    avatar: "KJ",
  },
  {
    name: "Ananya Rao",
    role: "IT Analyst at Accenture",
    text: "OMVSAB helped me understand the corporate IT world from the inside. The projects, the teamwork, the code reviews — everything felt like a real job. I was fully prepared on day one at Accenture.",
    rating: 5,
    avatar: "AR",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Student Stories
          </div>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-secondary mb-4">
            What Our Students Say
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Real experiences from students who transformed their careers through our programs.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-xl p-6 border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all duration-200">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-primary fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-heading font-semibold text-secondary text-sm">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
