import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

export default function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const stats = [
    { value: "1000+", label: "Students Placed" },
    { value: "200+", label: "Projects Delivered" },
    { value: "50+", label: "Corporate Clients" },
    { value: "10+", label: "Projects Live" },
  ];

  return (
    <section id="home" className="pt-20 min-h-screen flex items-center bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div
            className={`transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Trusted IT Solutions Partner
            </div>

            <h1 className="font-heading font-bold text-4xl lg:text-5xl xl:text-6xl text-secondary leading-tight mb-6">
              Custom Software{" "}
              <span className="text-primary">Development</span> &{" "}
              Internship Programs
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-xl">
              OMVSAB IT Solutions helps students and businesses with modern IT solutions,
              live projects, and career-focused internship training that builds real industry skills.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#services"
                className="bg-primary text-white px-8 py-3.5 rounded-md font-semibold text-sm hover:bg-orange-600 transition-colors duration-200 inline-flex items-center gap-2"
              >
                Get Started
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#contact"
                className="border border-gray-300 text-gray-700 px-8 py-3.5 rounded-md font-semibold text-sm hover:border-primary hover:text-primary transition-colors duration-200"
              >
                Contact Us
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-gray-100">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-heading font-bold text-2xl text-primary">{s.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Illustration */}
          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative">
              {/* Main Card */}
              <div className="bg-secondary rounded-2xl p-8 lg:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary opacity-10 rounded-full -translate-y-12 translate-x-12" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary opacity-10 rounded-full translate-y-10 -translate-x-10" />

                <div className="relative z-10">
                  {/* Logo — no background */}
                  <div className="mb-6 w-16 h-16">
                    <img src={logo} alt="OMVSAB IT Solutions" className="w-full h-full object-contain" />
                  </div>
                  <h3 className="font-heading font-bold text-white text-2xl mb-3">Start Your Tech Career</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    Join our internship program and work on live industry projects with mentorship from senior professionals.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {["React", "Node.js", "Spring Boot", "MongoDB", "AWS", "Flutter"].map((tech) => (
                      <span key={tech} className="bg-white bg-opacity-10 text-white text-xs px-3 py-1.5 rounded-md font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-primary border-2 border-secondary flex items-center justify-center text-white text-xs font-bold">
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                    </div>
                    <span className="text-gray-400 text-sm">1000+ students trained</span>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100 hidden lg:flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-800">Project Delivered</div>
                  <div className="text-xs text-gray-400">2 hours ago</div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100 hidden lg:block">
                <div className="text-xs font-semibold text-gray-800 mb-1">Placement Rate</div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 bg-gray-100 rounded-full w-28">
                    <div className="h-1.5 bg-primary rounded-full w-24" />
                  </div>
                  <span className="text-xs font-bold text-primary">92%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
