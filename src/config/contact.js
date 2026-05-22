// Central contact config — values pulled from .env (REACT_APP_ prefix required by CRA)
const contact = {
  phone: process.env.REACT_APP_CONTACT_PHONE || "+91 98765 43210",
  email: process.env.REACT_APP_CONTACT_EMAIL || "info@omvsab.com",
  location: process.env.REACT_APP_CONTACT_LOCATION || "Karve Nagar, Pune, Maharashtra 411052",
  address: process.env.REACT_APP_CONTACT_ADDRESS || "Sr.No 19/1/8, Above Pallavi Hotel, Lane 1, Hingane Home Colony, Karve Nagar, Pune 411052",
  hours: process.env.REACT_APP_CONTACT_HOURS || "Mon–Sat: 9:00 AM – 7:00 PM",
  mapsUrl: process.env.REACT_APP_MAPS_URL || "https://maps.app.goo.gl/WhMH7t1rx1qLQwYF9",
  mapsEmbed: process.env.REACT_APP_MAPS_EMBED || "",
  phoneRaw: (process.env.REACT_APP_CONTACT_PHONE || "+91 98765 43210").replace(/\s/g, ""),
};

export default contact;
