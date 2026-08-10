import logo from "../assets/logo.png";
import contact from "../config/contact";

const quickLinks = [
  { label: "Home", href: "#home" }, { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" }, { label: "Portfolio", href: "#portfolio" },
  { label: "Process", href: "#process" }, { label: "Contact", href: "#contact" },
];
const services = ["Software Development", "Web Design", "Android Applications", "Web Applications", "SEO Marketing", "Web Hosting", "IT Consulting"];
const socials = [
  { name: "LinkedIn", href: "https://linkedin.com", color: "hover:bg-blue-600" },
  { name: "Twitter", href: "https://twitter.com", color: "hover:bg-sky-500" },
  { name: "Instagram", href: "https://instagram.com", color: "hover:bg-pink-600" },
  { name: "GitHub", href: "https://github.com", color: "hover:bg-gray-600" },
];

export default function Footer() {
  return (
    <footer className="bg-secondary text-white relative overflow-hidden">
      <div className="absolute inset-0 dark-pattern" />
      <div className="absolute top-0 left-0 w-80 h-80 bg-primary opacity-[0.04] rounded-full -translate-x-20 -translate-y-20 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-DEFAULT opacity-[0.04] rounded-full translate-x-20 translate-y-20 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img src={logo} alt="OMVSAB IT Solution" className="h-12 w-auto object-contain" />
              <div>
                <div className="font-heading font-bold text-white text-lg leading-tight">OM<span className="text-primary">V</span>SAB</div>
                <div className="text-xs text-gray-400 tracking-wide">IT Solution</div>
                <div className="text-xs text-primary italic font-medium mt-0.5">We Code your Requirements</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Customized software solutions within affordable cost — contributing towards digitalization since 2008.
            </p>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noreferrer" title={s.name}
                  className={`w-9 h-9 bg-white bg-opacity-10 rounded-lg flex items-center justify-center text-xs font-bold text-gray-300 transition-all duration-200 ${s.color}`}>
                  {s.name[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-5 uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-gray-400 text-sm hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-5 uppercase tracking-widest">Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-gray-400 text-sm hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-5 uppercase tracking-widest">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary bg-opacity-20 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                </div>
                <a href={contact.mapsUrl} target="_blank" rel="noreferrer" className="text-gray-400 text-sm hover:text-primary transition-colors leading-snug">{contact.address}</a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-DEFAULT bg-opacity-20 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <a href={`tel:${contact.phoneRaw}`} className="text-gray-400 text-sm hover:text-primary transition-colors">{contact.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-DEFAULT bg-opacity-20 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <a href={`mailto:${contact.email}`} className="text-gray-400 text-sm hover:text-primary transition-colors">{contact.email}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white via-opacity-10 to-transparent mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">© 2008–{new Date().getFullYear()} Omvsab IT Solution. All Rights Reserved.</p>
          <div className="flex gap-5">
            <a href="/privacy" className="text-gray-500 text-xs hover:text-primary transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-gray-500 text-xs hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
