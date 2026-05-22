import { useState } from "react";
import contact from "../config/contact";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phoneRaw}`,
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: "Office",
      value: contact.address,
      href: contact.mapsUrl,
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "Working Hours",
      value: contact.hours,
      href: null,
    },
  ];

  return (
    <section id="contact" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Contact Us
          </div>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-secondary mb-4">
            Get In Touch With Us
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or want to learn about our internship programs?
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-5">
            {contactInfo.map((c) => (
              <div key={c.label} className="flex items-start gap-4">
                <div className="w-11 h-11 bg-orange-50 text-primary rounded-xl flex items-center justify-center shrink-0">
                  {c.icon}
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">{c.label}</div>
                  {c.href ? (
                    <a href={c.href} className="text-secondary font-semibold text-sm hover:text-primary transition-colors">
                      {c.value}
                    </a>
                  ) : (
                    <div className="text-secondary font-semibold text-sm">{c.value}</div>
                  )}
                </div>
              </div>
            ))}

            {/* Google Maps Embed */}
            <div className="mt-6 rounded-xl overflow-hidden border border-gray-100 h-52">
              <iframe
                title="OMVSAB IT Solutions Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.0!2d73.8200!3d18.4870!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfdc61d31357%3A0xfc71712ef2ff069b!2sOmvsab%20IT%20Solution!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a href={contact.mapsUrl} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-primary text-xs font-medium hover:underline mt-3">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open in Google Maps
            </a>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100">
            {submitted ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-heading font-bold text-secondary text-lg mb-2">Message Sent!</h4>
                  <p className="text-gray-500 text-sm">We'll get back to you within 24 hours.</p>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-heading font-semibold text-secondary text-lg mb-6">Send Us a Message</h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange}
                      placeholder="Your full name" required
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Email Address *</label>
                    <input name="email" value={form.email} onChange={handleChange}
                      type="email" placeholder="you@example.com" required
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone Number</label>
                    <input name="phone" value={form.phone} onChange={handleChange}
                      placeholder="+91 00000 00000"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Subject *</label>
                    <select name="subject" value={form.subject} onChange={handleChange} required
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors bg-white">
                      <option value="">Select a subject</option>
                      <option>Software Development</option>
                      <option>Internship Program</option>
                      <option>Website Development</option>
                      <option>IT Consulting</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="mb-5">
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange}
                    rows={4} placeholder="Tell us about your requirements..." required
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors bg-white resize-none" />
                </div>
                <button onClick={handleSubmit}
                  className="w-full bg-primary text-white py-3.5 rounded-lg font-semibold text-sm hover:bg-orange-600 transition-colors">
                  Send Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
