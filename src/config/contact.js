// Central contact config — values pulled from .env (REACT_APP_ prefix required by CRA)
const contact = {
  phone: process.env.REACT_APP_CONTACT_PHONE || "+91 98765 43210",
  email: process.env.REACT_APP_CONTACT_EMAIL || "info@omvsab.com",
  location: process.env.REACT_APP_CONTACT_LOCATION || "Pune, Maharashtra, India",
  hours: process.env.REACT_APP_CONTACT_HOURS || "Mon–Sat: 9:00 AM – 7:00 PM",
  phoneRaw: (process.env.REACT_APP_CONTACT_PHONE || "+91 98765 43210").replace(/\s/g, ""),
};

export default contact;
