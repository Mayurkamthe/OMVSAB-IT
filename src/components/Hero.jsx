import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

const stats = [
  { value: "200+", label: "Projects Delivered" },
  { value: "50+", label: "Happy Clients" },
  { value: "5+", label: "Years in Business" },
  { value: "15+", label: "Tech Experts" },
];

const techs = ["React", "Node.js", "Spring Boot", "Flutter", "AWS", "MongoDB"];

export default function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <section id="home" className="pt-16 sm:pt-20 min-h-screen flex items-center bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT */}
          <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 px-4 py-1.5 rounded-full text-xs font-medium mb-6 tracking-wide">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Pune-Based Software Company · Est. 2019
            </div>

            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-secondary leading-[1.1] mb-6">
              We Build Software<br />
              <span className="text-primary">That Works</span><br />
              for Your Business.
            </h1>

            <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              OMVSAB IT Solutions delivers custom web, mobile, and cloud software tailored to your business goals — on time, on budget, and built to scale.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <a href="#contact" className="bg-primary text-white px-7 py-3.5 rounded-md font-semibold text-sm hover:bg-orange-600 transition-colors inline-flex items-center gap-2">
                Start a Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#portfolio" className="border border-gray-300 text-gray-700 px-7 py-3.5 rounded-md font-semibold text-sm hover:border-primary hover:text-primary transition-colors">
                View Our Work
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-gray-100">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-heading font-bold text-2xl text-secondary">{s.value}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Main card */}
              <div className="bg-secondary rounded-2xl p-8 lg:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-56 h-56 bg-primary opacity-[0.07] rounded-full -translate-y-16 translate-x-16" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary opacity-[0.07] rounded-full translate-y-12 -translate-x-12" />
                <div className="relative z-10">
                  <img src={logo} alt="OMVSAB" className="w-12 h-12 object-contain mb-6" />
                  <h3 className="font-heading font-bold text-white text-xl mb-2">End-to-End Development</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    From requirements gathering to deployment and ongoing support — we handle the full product lifecycle.
                  </p>
                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {techs.map((t) => (
                      <span key={t} className="bg-white bg-opacity-[0.08] text-gray-300 text-xs px-3 py-1.5 rounded-md font-medium border border-white border-opacity-10">
                        {t}
                      </span>
                    ))}
                  </div>
                  {/* Progress bars */}
                  <div className="space-y-3">
                    {[["On-time Delivery", "96%", "w-[96%]"], ["Client Satisfaction", "98%", "w-[98%]"], ["Project Success Rate", "94%", "w-[94%]"]].map(([label, pct, w]) => (
                      <div key={label}>
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>{label}</span><span className="text-primary font-semibold">{pct}</span>
                        </div>
                        <div className="h-1 bg-white bg-opacity-10 rounded-full">
                          <div className={`h-1 bg-primary rounded-full ${w}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-3 -right-3 bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100 hidden sm:flex items-center gap-2.5">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-800">Project Shipped</div>
                  <div className="text-xs text-gray-400">ERP system · 3 days ago</div>
                </div>
              </div>

              <div className="absolute -bottom-3 -left-3 bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100 hidden sm:flex items-center gap-2.5">
                <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-800">Team of 15+ Experts</div>
                  <div className="text-xs text-gray-400">Across full stack & cloud</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
