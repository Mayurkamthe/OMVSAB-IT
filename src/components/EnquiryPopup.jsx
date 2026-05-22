import { useState, useEffect } from "react";

const SHEET_URL = process.env.REACT_APP_GOOGLE_SHEET_URL;

// SVG Icons
const InternshipIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
  </svg>
);

const ProjectIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const GraduationIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const SendIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const EnquireIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

const ENQUIRY_TYPES = [
  {
    id: "live_internship",
    label: "Live Internship",
    desc: "Work on real client projects with industry mentors",
    Icon: InternshipIcon,
  },
  {
    id: "project_development",
    label: "Project Development",
    desc: "Get your custom software / app built by our team",
    Icon: ProjectIcon,
  },
  {
    id: "final_year_project",
    label: "Final Year Project",
    desc: "Complete IEEE / university project with full guidance",
    Icon: GraduationIcon,
  },
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

export default function EnquiryPopup() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [enquiryType, setEnquiryType] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", college: "", course: "", year: "", message: "",
  });

  useEffect(() => {
    const seen = sessionStorage.getItem("enquiry_popup_seen");
    if (!seen) {
      const t = setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem("enquiry_popup_seen", "1");
      }, 3000);
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
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setStep(1); setEnquiryType(""); setSubmitted(false); setError("");
      setForm({ name: "", email: "", phone: "", college: "", course: "", year: "", message: "" });
    }, 400);
  };

  const selectedType = ENQUIRY_TYPES.find(t => t.id === enquiryType);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 left-4 sm:left-6 z-40 bg-secondary text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg hover:bg-primary transition-colors duration-300 flex items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <EnquireIcon />
        Enquire Now
      </button>

      {/* Backdrop */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 z-50 bg-black transition-opacity duration-300 ${open ? "bg-opacity-50 pointer-events-auto" : "bg-opacity-0 pointer-events-none"}`}
      />

      {/* Modal */}
      <div className={`fixed z-50 inset-x-3 sm:inset-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-lg top-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl transition-all duration-300 ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>

        {/* Header */}
        <div className="bg-secondary rounded-t-2xl px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-white text-lg">
              {step === 1 ? "What are you looking for?" : `${selectedType?.label} Enquiry`}
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
              {ENQUIRY_TYPES.map(({ id, label, desc, Icon }) => (
                <button key={id} onClick={() => handleTypeSelect(id)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-primary hover:bg-orange-50 transition-all duration-200 text-left group">
                  <div className="w-11 h-11 bg-orange-50 group-hover:bg-primary group-hover:text-white text-primary rounded-xl flex items-center justify-center shrink-0 transition-colors">
                    <Icon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-heading font-semibold text-secondary text-sm group-hover:text-primary transition-colors">{label}</div>
                    <div className="text-xs text-gray-400 mt-0.5 leading-relaxed">{desc}</div>
                  </div>
                  <div className="text-gray-300 group-hover:text-primary shrink-0 transition-colors">
                    <ChevronRightIcon />
                  </div>
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
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Your full name"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone Number *</label>
                  <input name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 00000 00000"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Email Address *</label>
                  <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="you@example.com"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">College / University *</label>
                  <input name="college" value={form.college} onChange={handleChange} required placeholder="College name"
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
                  className="flex items-center justify-center gap-1.5 flex-1 border border-gray-200 text-gray-600 py-3 rounded-lg text-sm font-medium hover:border-gray-300 transition-colors">
                  <ArrowLeftIcon /> Back
                </button>
                <button type="submit" disabled={submitting}
                  className="flex items-center justify-center gap-2 flex-[2] bg-primary text-white py-3 rounded-lg text-sm font-semibold hover:bg-orange-600 disabled:opacity-60 transition-colors">
                  {submitting ? "Submitting..." : <><SendIcon /> Submit Enquiry</>}
                </button>
              </div>
            </form>
          )}

          {/* Success */}
          {step === 2 && submitted && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckIcon />
              </div>
              <h3 className="font-heading font-bold text-secondary text-xl mb-2">Enquiry Submitted</h3>
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
