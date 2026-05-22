import { useState, useEffect } from "react";

const SHEET_URL = process.env.REACT_APP_GOOGLE_SHEET_URL;

const ENQUIRY_TYPES = [
  { id: "live_internship", label: "Live Internship", icon: "💻" },
  { id: "project_development", label: "Project Development", icon: "🚀" },
  { id: "final_year_project", label: "Final Year Project", icon: "🎓" },
];

const COURSES = [
  "Full Stack Web Development",
  "Mobile App Development",
  "Java Backend Development",
  "UI/UX Design",
  "Data Science / ML",
  "Cloud & DevOps",
  "Other",
];

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function EnquiryPopup() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1); // 1 = type select, 2 = form
  const [enquiryType, setEnquiryType] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    course: "",
    year: "",
    message: "",
  });

  // Show popup after 3 seconds on first visit
  useEffect(() => {
    const seen = sessionStorage.getItem("enquiry_popup_seen");
    if (!seen) {
      const t = setTimeout(() => { setOpen(true); sessionStorage.setItem("enquiry_popup_seen", "1"); }, 3000);
      return () => clearTimeout(t);
    }
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleTypeSelect = (id) => { setEnquiryType(id); setStep(2); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!SHEET_URL || SHEET_URL.includes("YOUR_SCRIPT_ID")) {
      setError("Google Sheet URL not configured. Please add REACT_APP_GOOGLE_SHEET_URL to .env");
      return;
    }
    setSubmitting(true);
    setError("");

    const payload = {
      enquiryType: ENQUIRY_TYPES.find(t => t.id === enquiryType)?.label || enquiryType,
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      ...form,
    };

    try {
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => { setStep(1); setEnquiryType(""); setSubmitted(false); setError(""); setForm({ name: "", email: "", phone: "", college: "", course: "", year: "", message: "" }); }, 400);
  };

  const selectedType = ENQUIRY_TYPES.find(t => t.id === enquiryType);

  return (
    <>
      {/* Trigger button — always visible */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 left-4 sm:left-6 z-40 bg-secondary text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg hover:bg-primary transition-colors duration-300 flex items-center gap-2 group"
      >
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        Enquire Now
      </button>

      {/* Backdrop */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 z-50 bg-black transition-opacity duration-300 ${open ? "bg-opacity-50 pointer-events-auto" : "bg-opacity-0 pointer-events-none"}`}
      />

      {/* Modal */}
      <div
        className={`fixed z-50 inset-x-3 sm:inset-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-lg top-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl transition-all duration-300 ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        {/* Header */}
        <div className="bg-secondary rounded-t-2xl px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-white text-lg">
              {step === 1 ? "What are you looking for?" : `${selectedType?.icon} ${selectedType?.label} Enquiry`}
            </h2>
            <p className="text-gray-400 text-xs mt-0.5">
              {step === 1 ? "Select your enquiry type to get started" : "Fill in your details — we'll reach out soon!"}
            </p>
          </div>
          <button onClick={handleClose} className="p-2 rounded-lg bg-white bg-opacity-10 text-gray-400 hover:text-white transition-colors">
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Step 1 — Type Selection */}
          {step === 1 && (
            <div className="space-y-3">
              {ENQUIRY_TYPES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleTypeSelect(t.id)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-primary hover:bg-orange-50 transition-all duration-200 text-left group"
                >
                  <span className="text-3xl">{t.icon}</span>
                  <div>
                    <div className="font-heading font-semibold text-secondary text-sm group-hover:text-primary transition-colors">{t.label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {t.id === "live_internship" && "Work on real client projects with industry mentors"}
                      {t.id === "project_development" && "Get your custom software / app built by our team"}
                      {t.id === "final_year_project" && "Complete IEEE / university project with full guidance"}
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-primary ml-auto shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          )}

          {/* Step 2 — Form */}
          {step === 2 && !submitted && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required
                    placeholder="Your full name"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone Number *</label>
                  <input name="phone" value={form.phone} onChange={handleChange} required
                    placeholder="+91 00000 00000"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Email Address *</label>
                  <input name="email" value={form.email} onChange={handleChange} required type="email"
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">College / University *</label>
                  <input name="college" value={form.college} onChange={handleChange} required
                    placeholder="College name"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Current Year *</label>
                  <select name="year" value={form.year} onChange={handleChange} required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors bg-white">
                    <option value="">Select year</option>
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>Final Year</option>
                    <option>Passed Out</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Interested In</label>
                  <select name="course" value={form.course} onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors bg-white">
                    <option value="">Select a track</option>
                    {COURSES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Message / Requirements</label>
                  <textarea name="message" value={form.message} onChange={handleChange}
                    rows={3} placeholder="Tell us more about what you need..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors resize-none" />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg px-4 py-3">{error}</div>
              )}

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setStep(1)}
                  className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-lg text-sm font-medium hover:border-gray-300 transition-colors">
                  ← Back
                </button>
                <button type="submit" disabled={submitting}
                  className="flex-[2] bg-primary text-white py-3 rounded-lg text-sm font-semibold hover:bg-orange-600 disabled:opacity-60 transition-colors">
                  {submitting ? "Submitting..." : "Submit Enquiry"}
                </button>
              </div>
            </form>
          )}

          {/* Success */}
          {step === 2 && submitted && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-secondary text-xl mb-2">Enquiry Submitted! 🎉</h3>
              <p className="text-gray-500 text-sm mb-1">Thank you, <strong>{form.name}</strong>!</p>
              <p className="text-gray-400 text-sm mb-6">Our team will contact you on <strong>{form.phone}</strong> within 24 hours.</p>
              <button onClick={handleClose}
                className="bg-primary text-white px-8 py-2.5 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors">
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
