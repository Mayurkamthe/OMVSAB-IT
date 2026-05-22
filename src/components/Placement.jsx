export default function Placement() {
  const companies = ["TCS", "Infosys", "Wipro", "Capgemini", "Accenture", "HCL", "Tech Mahindra", "Cognizant"];

  const stats = [
    { value: "1000+", label: "Students Placed" },
    { value: "92%", label: "Placement Rate" },
    { value: "₹4.5 LPA", label: "Avg. Package" },
    { value: "50+", label: "Partner Companies" },
  ];

  return (
    <section id="placement" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Placement Success
          </div>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-secondary mb-4">
            1000+ Students Placed in MNC Companies
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Our students are working at top-tier companies across India. Our placement record speaks for 
            the quality of our training and mentorship programs.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {stats.map((s) => (
            <div key={s.label} className="text-center bg-gray-50 rounded-xl p-7 border border-gray-100">
              <div className="font-heading font-bold text-3xl text-primary mb-2">{s.value}</div>
              <div className="text-gray-500 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Company Logos */}
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
          <h3 className="font-heading font-semibold text-secondary text-center text-lg mb-8">
            Our Students Work At
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {companies.map((company) => (
              <div
                key={company}
                className="bg-white rounded-xl py-5 px-4 flex items-center justify-center border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all duration-200"
              >
                <span className="font-heading font-bold text-secondary text-sm tracking-wide">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
