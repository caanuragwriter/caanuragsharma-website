export default function Services() {
  const services = [
    {
      icon: "📊",
      title: "GST Advisory",
      desc: "GST Registration, Returns, Notices, Litigation and Compliance."
    },
    {
      icon: "💰",
      title: "Income Tax",
      desc: "Income Tax Planning, ITR Filing, TDS and Tax Advisory."
    },
    {
      icon: "🏢",
      title: "MSME Advisory",
      desc: "MSME Registration, Delayed Payments and Government Benefits."
    },
    {
      icon: "⚖️",
      title: "Corporate Law",
      desc: "Company Incorporation, ROC Compliance and Secretarial Support."
    },
    {
      icon: "🤝",
      title: "LLP Advisory",
      desc: "LLP Formation, Annual Compliance and Advisory Services."
    },
    {
      icon: "📈",
      title: "Financial Reporting",
      desc: "MIS Reports, Financial Statements and Business Analysis."
    },
    {
      icon: "📊",
      title: "Excel Automation",
      desc: "Dashboards, Automation, Reporting and Excel Training."
    },
    {
      icon: "🤖",
      title: "AI for Finance",
      desc: "Using Artificial Intelligence for Finance and Accounting."
    },
    {
      icon: "🎓",
      title: "Corporate Training",
      desc: "Training sessions on GST, Finance, Excel and AI."
    }
  ];

  return (
    <section className="py-24 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold text-blue-900">
            Professional Services
          </h2>

          <p className="text-xl text-gray-600 mt-5 max-w-3xl mx-auto">
            Professional financial, taxation and corporate advisory
            services tailored for businesses, startups and professionals.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >

              <div className="text-5xl mb-6">
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                {service.title}
              </h3>

              <p className="text-gray-600 leading-7 mb-6">
                {service.desc}
              </p>

              <button className="text-blue-700 font-semibold hover:text-blue-900">
                Learn More →
              </button>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}