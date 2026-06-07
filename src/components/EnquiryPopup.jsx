import { useState, useEffect, useRef, useCallback } from "react";

// ─── Google Sheet endpoint ───────────────────────────────────────────────────
const SHEET_URL = process.env.REACT_APP_GOOGLE_SHEET_URL;

// ─── Anti-spam: minimum seconds between form-open and first submit ───────────
const ANTI_SPAM_DELAY_MS = 10_000;

// ─── Fake / repeated-digit phone numbers to reject ───────────────────────────
const FAKE_PHONE_PATTERN = /^(\d)\1{9}$/; // e.g. 0000000000, 1111111111 …

// ═══════════════════════════════════════════════════════════════════════════════
// VALIDATION HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

/** Remove HTML tags and trim whitespace — prevents script / markup injection */
const sanitize = (value) =>
  value.replace(/<[^>]*>/g, "").replace(/[<>"'`]/g, "").trim();

/** Validate a 10-digit Indian mobile number */
const validatePhone = (value) => {
  const digits = value.replace(/\s+/g, ""); // strip spaces
  if (!/^\d{10}$/.test(digits))       return "Phone must be exactly 10 digits.";
  if (!/^[6-9]/.test(digits))         return "Phone must start with 6, 7, 8, or 9.";
  if (FAKE_PHONE_PATTERN.test(digits)) return "Please enter a valid phone number.";
  return "";
};

/** Validate standard email format */
const validateEmail = (value) => {
  if (!value) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value))
    return "Enter a valid email address.";
  return "";
};

/** Validate that a field is not empty after trimming */
const validateRequired = (value, label) =>
  value.trim() ? "" : `${label} is required.`;

/**
 * Run full-form validation and return an errors map.
 * Returns an empty object if everything is valid.
 */
const validateForm = (form) => {
  const errs = {};

  const nameErr = validateRequired(form.name, "Full Name");
  if (nameErr) errs.name = nameErr;

  const emailErr = validateEmail(form.email.trim());
  if (emailErr) errs.email = emailErr;

  const phoneErr = validatePhone(form.phone);
  if (phoneErr) errs.phone = phoneErr;

  const collegeErr = validateRequired(form.college, "College");
  if (collegeErr) errs.college = collegeErr;

  const yearErr = validateRequired(form.year, "Current Year");
  if (yearErr) errs.year = yearErr;

  return errs;
};

// ═══════════════════════════════════════════════════════════════════════════════
// STATIC DATA
// ═══════════════════════════════════════════════════════════════════════════════

const ENQUIRY_TYPES = [
  {
    id: "live_internship",
    label: "Live Internship",
    desc: "Work on real client projects with industry mentors",
    Icon: () => (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
      </svg>
    ),
  },
  {
    id: "project_development",
    label: "Project Development",
    desc: "Get your custom software / app built by our team",
    Icon: () => (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: "final_year_project",
    label: "Final Year Project",
    desc: "Complete IEEE / university project with full guidance",
    Icon: () => (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
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

// ═══════════════════════════════════════════════════════════════════════════════
// SMALL REUSABLE COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

/** Inline field error shown beneath an input */
const FieldError = ({ msg }) =>
  msg ? <p className="mt-1 text-xs text-red-500">{msg}</p> : null;

/** Toast notification (success / error) */
const Toast = ({ type, message, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl text-sm font-medium transition-all duration-300 ${
        type === "success"
          ? "bg-green-600 text-white"
          : "bg-red-600 text-white"
      }`}
    >
      {type === "success" ? (
        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

/** Loading spinner inline in the submit button */
const Spinner = () => (
  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

const EMPTY_FORM = {
  name: "", email: "", phone: "", college: "", course: "", year: "", message: "",
};

export default function EnquiryPopup() {
  // ── UI state ────────────────────────────────────────────────────────────────
  const [open, setOpen]           = useState(false);
  const [step, setStep]           = useState(1);
  const [enquiryType, setType]    = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]  = useState(false);
  const [toast, setToast]          = useState(null); // { type, message }

  // ── Form state ──────────────────────────────────────────────────────────────
  const [form, setForm]     = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({}); // tracks which fields the user visited

  // ── Anti-spam: record timestamp when step 2 is first shown ──────────────────
  const formOpenedAt = useRef(null);

  // ── Auto-open after 3 s (once per session) ──────────────────────────────────
  useEffect(() => {
    if (!sessionStorage.getItem("enquiry_popup_seen")) {
      const t = setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem("enquiry_popup_seen", "1");
      }, 3000);
      return () => clearTimeout(t);
    }
  }, []);

  // ── Record when the form (step 2) is first opened for anti-spam ─────────────
  useEffect(() => {
    if (step === 2 && !formOpenedAt.current) {
      formOpenedAt.current = Date.now();
    }
  }, [step]);

  // ────────────────────────────────────────────────────────────────────────────
  // Derived state
  // ────────────────────────────────────────────────────────────────────────────

  // Only the fields that have been touched get error highlights
  const visibleErrors = Object.fromEntries(
    Object.entries(errors).filter(([k]) => touched[k])
  );

  // Submit is enabled when: no validation errors at all (touched or not)
  const formErrors  = validateForm(form);
  const isFormValid = Object.keys(formErrors).length === 0;

  // ────────────────────────────────────────────────────────────────────────────
  // Handlers
  // ────────────────────────────────────────────────────────────────────────────

  /** Handle every input / select / textarea change with live validation */
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    // Phone: allow only numeric characters while typing
    const cleaned = name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value;

    // Enforce length caps
    const capped =
      name === "name"    ? cleaned.slice(0, 50) :
      name === "message" ? cleaned.slice(0, 500) :
      cleaned;

    setForm((prev) => ({ ...prev, [name]: capped }));

    // Mark field as touched on first keystroke
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Live-validate the changed field only
    const updatedForm = { ...form, [name]: capped };
    const newErrors   = validateForm(updatedForm);
    setErrors(newErrors);
  }, [form]);

  /** Mark field as touched on blur so error shows when user leaves the field */
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validateForm({ ...form, [name]: form[name] });
    setErrors(newErrors);
  }, [form]);

  /** Proceed from step 1 (type selection) → step 2 (form) */
  const handleTypeSelect = (id) => {
    setType(id);
    setStep(2);
  };

  /** Full form submit */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark every field touched to surface all errors at once
    const allTouched = Object.fromEntries(Object.keys(EMPTY_FORM).map((k) => [k, true]));
    setTouched(allTouched);

    const errs = validateForm(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // ── Anti-spam check ──────────────────────────────────────────────────────
    const elapsed = Date.now() - (formOpenedAt.current || 0);
    if (elapsed < ANTI_SPAM_DELAY_MS) {
      const wait = Math.ceil((ANTI_SPAM_DELAY_MS - elapsed) / 1000);
      setToast({ type: "error", message: `Please wait ${wait}s before submitting.` });
      return;
    }

    // ── Env check ────────────────────────────────────────────────────────────
    if (!SHEET_URL || SHEET_URL.includes("YOUR_SCRIPT_ID")) {
      setToast({ type: "error", message: "Google Sheet URL is not configured." });
      return;
    }

    setSubmitting(true);

    // ── Sanitize every field before sending ──────────────────────────────────
    const sanitizedForm = Object.fromEntries(
      Object.entries(form).map(([k, v]) => [k, sanitize(v)])
    );

    const payload = {
      enquiryType: ENQUIRY_TYPES.find((t) => t.id === enquiryType)?.label ?? enquiryType,
      timestamp:   new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      ...sanitizedForm,
    };

    try {
      await fetch(SHEET_URL, {
        method:  "POST",
        mode:    "no-cors",  // Google Apps Script CORS restriction
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });

      // no-cors means we never get a non-opaque response — treat reaching here as success
      setSubmitted(true);
      setToast({ type: "success", message: "Enquiry submitted! We'll contact you soon." });

    } catch {
      // Genuine network failure
      setToast({ type: "error", message: "Submission failed. Please try again or call us." });
    } finally {
      setSubmitting(false);
    }
  };

  /** Reset and close */
  const handleClose = useCallback(() => {
    setOpen(false);
    // Delay reset until close animation completes
    setTimeout(() => {
      setStep(1);
      setType("");
      setSubmitted(false);
      setErrors({});
      setTouched({});
      setForm(EMPTY_FORM);
      formOpenedAt.current = null;
    }, 350);
  }, []);

  const selectedType = ENQUIRY_TYPES.find((t) => t.id === enquiryType);

  // ────────────────────────────────────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * Returns border class for a field:
   *   • error   → red border
   *   • valid   → green border (field touched & no error)
   *   • default → gray border
   */
  const fieldBorder = (name) => {
    if (!touched[name]) return "border-gray-200 focus:border-primary";
    if (errors[name])   return "border-red-400 focus:border-red-500";
    return "border-green-400 focus:border-green-500";
  };

  return (
    <>
      {/* ── Toast notification ─────────────────────────────────────────────── */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* ── Trigger button ─────────────────────────────────────────────────── */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open enquiry form"
        className="fixed bottom-24 left-4 sm:left-6 z-40 bg-secondary text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg hover:bg-primary transition-colors duration-300 flex items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        Enquire Now
      </button>

      {/* ── Backdrop ───────────────────────────────────────────────────────── */}
      <div
        onClick={handleClose}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-black transition-opacity duration-300 ${
          open ? "bg-opacity-50 pointer-events-auto" : "bg-opacity-0 pointer-events-none"
        }`}
      />

      {/* ── Modal ──────────────────────────────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Enquiry form"
        className={`fixed z-50 inset-x-3 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg top-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl transition-all duration-300 ${
          open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >

        {/* Header */}
        <div className="bg-secondary rounded-t-2xl px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-white text-lg">
              {step === 1 ? "What are you looking for?" : `${selectedType?.label} Enquiry`}
            </h2>
            <p className="text-gray-400 text-xs mt-0.5">
              {step === 1
                ? "Select your enquiry type to get started"
                : "Fill in your details — we'll reach out soon!"}
            </p>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="p-2 rounded-lg bg-white bg-opacity-10 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">

          {/* ── Step 1: Enquiry type selection ─────────────────────────────── */}
          {step === 1 && (
            <div className="space-y-3">
              {ENQUIRY_TYPES.map(({ id, label, desc, Icon }) => (
                <button
                  key={id}
                  onClick={() => handleTypeSelect(id)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-primary hover:bg-orange-50 transition-all duration-200 text-left group"
                >
                  <div className="w-11 h-11 bg-orange-50 group-hover:bg-primary group-hover:text-white text-primary rounded-xl flex items-center justify-center shrink-0 transition-colors">
                    <Icon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-heading font-semibold text-secondary text-sm group-hover:text-primary transition-colors">
                      {label}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5 leading-relaxed">{desc}</div>
                  </div>
                  <div className="text-gray-300 group-hover:text-primary shrink-0 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* ── Step 2: Form ────────────────────────────────────────────────── */}
          {step === 2 && !submitted && (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your full name"
                    maxLength={50}
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors ${fieldBorder("name")}`}
                  />
                  {/* Character counter shown when close to limit */}
                  {form.name.length > 40 && (
                    <p className="mt-0.5 text-xs text-gray-400 text-right">{form.name.length}/50</p>
                  )}
                  <FieldError msg={visibleErrors.name} />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="10-digit mobile number"
                    inputMode="numeric"  /* mobile numeric keyboard */
                    maxLength={10}
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors ${fieldBorder("phone")}`}
                  />
                  {/* WhatsApp hint — shown when phone is valid */}
                  {!errors.phone && form.phone.length === 10 && (
                    <p className="mt-0.5 text-xs text-green-600 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.112 1.533 5.836L.057 23.852a.5.5 0 00.609.609l6.007-1.48A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.804 9.804 0 01-5.002-1.37l-.359-.213-3.717.914.937-3.631-.234-.374A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
                      </svg>
                      Valid WhatsApp number
                    </p>
                  )}
                  <FieldError msg={visibleErrors.phone} />
                </div>

                {/* Email */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="email"
                    placeholder="you@example.com"
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors ${fieldBorder("email")}`}
                  />
                  <FieldError msg={visibleErrors.email} />
                </div>

                {/* College */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    College / University <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="college"
                    value={form.college}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="College name"
                    maxLength={100}
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors ${fieldBorder("college")}`}
                  />
                  <FieldError msg={visibleErrors.college} />
                </div>

                {/* Year */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Current Year <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors bg-white ${fieldBorder("year")}`}
                  >
                    <option value="">Select year</option>
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>Final Year</option>
                    <option>Passed Out</option>
                  </select>
                  <FieldError msg={visibleErrors.year} />
                </div>

                {/* Course (optional) */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Interested In
                  </label>
                  <select
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors bg-white"
                  >
                    <option value="">Select a track</option>
                    {COURSES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>

                {/* Message (optional) */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Message / Requirements
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    maxLength={500}
                    placeholder="Tell us more about what you need..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                  {/* Live character counter */}
                  <p className={`text-xs text-right mt-0.5 ${form.message.length > 450 ? "text-orange-500" : "text-gray-400"}`}>
                    {form.message.length}/500
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center justify-center gap-1.5 flex-1 border border-gray-200 text-gray-600 py-3 rounded-lg text-sm font-medium hover:border-gray-300 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>

                {/*
                  Disabled until: form is valid AND not currently submitting.
                  This prevents double-submission naturally.
                */}
                <button
                  type="submit"
                  disabled={!isFormValid || submitting}
                  className="flex items-center justify-center gap-2 flex-[2] bg-primary text-white py-3 rounded-lg text-sm font-semibold hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? (
                    <><Spinner /> Submitting…</>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Submit Enquiry
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* ── Step 2: Success state ────────────────────────────────────────── */}
          {step === 2 && submitted && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-secondary text-xl mb-2">Enquiry Submitted!</h3>
              <p className="text-gray-500 text-sm mb-1">
                Thank you, <strong>{sanitize(form.name)}</strong>!
              </p>
              <p className="text-gray-400 text-sm mb-6">
                Our team will contact you on <strong>{form.phone}</strong> within 24 hours.
              </p>
              <div className="flex gap-3 justify-center">
                {/* Submit another enquiry without fully closing */}
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setStep(1);
                    setForm(EMPTY_FORM);
                    setErrors({});
                    setTouched({});
                    formOpenedAt.current = null;
                  }}
                  className="border border-gray-200 text-gray-600 px-5 py-2.5 rounded-lg text-sm font-medium hover:border-gray-300 transition-colors"
                >
                  New Enquiry
                </button>
                <button
                  onClick={handleClose}
                  className="bg-primary text-white px-8 py-2.5 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
