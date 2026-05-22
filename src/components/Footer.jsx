import logo from "../assets/logo.png";
import contact from "../config/contact";

export default function Footer() {
  const services = [
    "Software Development", "Website Development", "Mobile App Development",
    "UI/UX Design", "Cloud Solutions", "IT Consulting",
  ];
  const quickLinks = ["Home", "About Us", "Services", "Internship", "Placement", "Contact"];

  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img src={logo} alt="OMVSAB IT Solutions" className="h-12 w-auto object-contain" />
              <div>
                <div className="font-heading font-bold text-white text-lg leading-tight">OMVSAB</div>
                <div className="text-xs text-gray-400 tracking-wide">IT Solutions</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering businesses and students through modern IT solutions, live project training,
              and career-focused internship programs.
            </p>
            <div className="flex gap-3">
              {["LinkedIn", "Twitter", "Instagram", "GitHub"].map((s) => (
                <a key={s} href={`https://${s.toLowerCase()}.com`} target="_blank" rel="noreferrer"
                  className="w-9 h-9 bg-white bg-opacity-10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-200 text-xs font-bold"
                  title={s}>
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-5 uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase().replace(/\s+/g, "")}`}
                    className="text-gray-400 text-sm hover:text-primary transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-5 uppercase tracking-wide">Services</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-gray-400 text-sm hover:text-primary transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-5 uppercase tracking-wide">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span className="text-gray-400 text-sm">{contact.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${contact.phoneRaw}`} className="text-gray-400 text-sm hover:text-primary transition-colors">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${contact.email}`} className="text-gray-400 text-sm hover:text-primary transition-colors">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white border-opacity-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">© {new Date().getFullYear()} OMVSAB IT Solutions. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="/privacy" className="text-gray-500 text-xs hover:text-primary transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-gray-500 text-xs hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
