export default function KnowledgeHub() {
  const topics = [
     {
  title: "GST",
  description:
    "GST updates, QRMP Scheme, e-Invoicing, returns, compliance and practical guidance.",
  link: "/images/gst-update.jpg",
},
   {
  title: "Income Tax",
  description:
    "Income-tax Act, 2025, ITRs, TDS, TCS, tax planning and advisory.",
  link: "/images/tax-update.jpg",
},
    {
      title: "MSME",
      description:
        "MSME registration, payment provisions, benefits and compliance.",
    },
    {
      title: "Corporate Law",
      description:
        "Companies Act, LLP compliance, ROC filings and governance.",
    },
    {
      title: "Finance",
      description:
        "Financial reporting, corporate finance, analysis and business insights.",
    },
    {
      title: "Excel & AI",
      description:
        "Excel automation, dashboards and AI tools for finance professionals.",
    },
  ];

  return (
    <section
      id="knowledge"
      className="max-w-7xl mx-auto px-6 py-24"
    >
      <div className="text-center">

        <h2 className="text-4xl font-bold text-slate-900">
          Knowledge Hub
        </h2>

        <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
          Explore articles and practical insights on taxation, finance,
          corporate compliance, technology and professional development.
        </p>

      </div>

      <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {topics.map((topic) => (
          <div
            key={topic.title}
            className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-lg transition"
          >
           

<h3 className="text-2xl font-semibold text-blue-700">
  {topic.title}
</h3>
            <p className="mt-4 text-gray-600 leading-7">
              {topic.description}
            </p>

           <a
  href={topic.link || "#"}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-8 inline-block text-blue-700 font-semibold hover:underline"
>
  Read Articles →
</a>
          </div>
        ))}

      </div>
    </section>
  );
}