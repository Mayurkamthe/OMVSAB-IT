import { useState, useEffect } from "react";
import logo from "../assets/logo.png";

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
        scrolled ? "bg-white shadow-md py-3" : "bg-white border-b border-gray-100 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2">
          <img src={logo} alt="OMVSAB IT Solutions Logo" className="h-12 w-auto object-contain" />
          <div className="hidden sm:block">
            <div className="font-heading font-bold text-secondary text-lg leading-tight">OMVSAB</div>
            <div className="text-xs text-gray-500 tracking-wide leading-tight">IT Solutions</div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+919999999999"
            className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
          >
            +91 99999 99999
          </a>
          <a
            href="#contact"
            className="bg-primary text-white px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-orange-600 transition-colors duration-200"
          >
            Get In Touch
          </a>
        </div>

        {/* Mobile Menu */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`w-6 h-0.5 bg-secondary mb-1.5 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-6 h-0.5 bg-secondary mb-1.5 transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <div className={`w-6 h-0.5 bg-secondary transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="block text-sm font-medium text-gray-700 hover:text-primary py-1"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            className="block bg-primary text-white text-center px-5 py-2.5 rounded-md text-sm font-semibold mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Get In Touch
          </a>
        </div>
      )}
    </header>
  );
}
