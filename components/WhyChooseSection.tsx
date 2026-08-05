export default function WhyChooseSection() {
  const features = [
    {
      icon: "💼",
      title: "10+ Years Experience",
      description:
        "Extensive experience in finance, taxation, audit, compliance and corporate advisory.",
    },
    {
      icon: "📚",
      title: "Published Author",
      description:
        "Author of five books covering corporate life, finance, taxation, fiction and poetry.",
    },
    {
      icon: "✍️",
      title: "Finance Writer",
      description:
        "Regularly write practical articles on GST, Income Tax, MSME, LLP and Corporate Law.",
    },
    {
      icon: "🎓",
      title: "Corporate Trainer",
      description:
        "Conducts sessions on Finance, Excel, AI and taxation for professionals and students.",
    },
    {
      icon: "⚖️",
      title: "Compliance Expert",
      description:
        "Helping businesses navigate GST, Income Tax, corporate compliance and regulatory matters.",
    },
    {
      icon: "🤝",
      title: "Practical Approach",
      description:
        "Providing simple, practical and business-focused solutions instead of complicated jargon.",
    },
  ];

  return (
    <section className="py-28 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-blue-700 font-semibold uppercase tracking-widest">
            Why Work With Me
          </span>

          <h2 className="text-5xl font-bold text-gray-900 mt-4">
            Experience. Knowledge. Trust.
          </h2>

          <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto leading-9">
            Combining corporate experience, technical expertise, writing and
            training to help businesses and professionals make better financial
            decisions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
            >
              <div className="text-5xl">{item.icon}</div>

              <h3 className="text-2xl font-bold text-gray-900 mt-6">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-5 leading-8">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}