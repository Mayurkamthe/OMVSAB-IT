import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import contact from "../config/contact";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = ["Home", "About", "Services", "Internship", "Placement", "Contact"];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-white border-b border-gray-100 py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="OMVSAB IT Solutions Logo" className="h-10 sm:h-12 w-auto object-contain" />
          <div className="">
            <div className="font-heading font-bold text-secondary text-base sm:text-lg leading-tight">OM<span className="text-primary text-lg sm:text-xl">V</span>SAB</div>
            <div className="text-xs text-gray-500 tracking-wide leading-tight">IT Solutions <span className="text-primary font-semibold italic">— We Code your Requirements</span></div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`}
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200 whitespace-nowrap">
              {link}
            </a>
          ))}
        </nav>

        {/* CTA — desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <a href={`tel:${contact.phoneRaw}`}
            className="text-sm font-medium text-gray-600 hover:text-primary transition-colors whitespace-nowrap">
            {contact.phone}
          </a>
          <a href="#contact"
            className="bg-primary text-white px-4 xl:px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-orange-600 transition-colors duration-200 whitespace-nowrap">
            Get In Touch
          </a>
        </div>

        {/* Hamburger */}
        <button className="lg:hidden p-2 ml-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <div className={`w-6 h-0.5 bg-secondary mb-1.5 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-6 h-0.5 bg-secondary mb-1.5 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <div className={`w-6 h-0.5 bg-secondary transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div className={`lg:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-96" : "max-h-0"}`}>
        <div className="px-4 sm:px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`}
              className="block text-sm font-medium text-gray-700 hover:text-primary py-2.5 border-b border-gray-50"
              onClick={() => setMenuOpen(false)}>
              {link}
            </a>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <a href={`tel:${contact.phoneRaw}`}
              className="text-sm font-medium text-gray-600 hover:text-primary text-center py-2">
              {contact.phone}
            </a>
            <a href="#contact"
              className="block bg-primary text-white text-center px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-orange-600 transition-colors"
              onClick={() => setMenuOpen(false)}>
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
