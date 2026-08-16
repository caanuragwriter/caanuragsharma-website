import Link from "next/link";
import { createClient } from "../utils/supabase/server";

export default async function KnowledgeHub() {
  const supabase = await createClient();

  const { data: articles, error } = await supabase
    .from("articles")
    .select("id, title, slug, category, description, image, views, likes")
    .order("created_at", { ascending: false });

  const topics = [
    {
      title: "GST",
      description:
        "GST updates, QRMP Scheme, e-Invoicing, returns, compliance and practical guidance.",
    },
    {
      title: "Income Tax",
      description:
        "Income-tax Act, ITRs, TDS, TCS, tax planning and advisory.",
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
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-900">
          Knowledge Hub
        </h2>

        <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
          Explore articles and practical insights on taxation, finance,
          corporate compliance, technology and professional development.
        </p>
      </div>

      {/* Topic Cards */}
      <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topics.map((topic) => {
          const topicArticles =
            articles?.filter(
              (article) =>
                article.category?.toLowerCase() ===
                topic.title.toLowerCase()
            ) || [];

          return (
            <div
              key={topic.title}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-lg transition"
            >
              {/* Topic title */}
              <h3 className="text-2xl font-semibold text-blue-700">
                {topic.title}
              </h3>

              {/* Topic description */}
              <p className="mt-4 text-gray-600 leading-7">
                {topic.description}
              </p>

              {/* Articles */}
              <div className="mt-6 space-y-4">
                {topicArticles.length > 0 ? (
                  topicArticles.map((article) => (
                    <div
                      key={article.id}
                      className="border-t border-gray-100 pt-4"
                    >
                      <Link
                        href={`/articles/${article.slug}`}
                        className="font-semibold text-slate-800 hover:text-blue-700 transition"
                      >
                        {article.title} →
                      </Link>

                      {article.description && (
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                          {article.description}
                        </p>
                      )}

                      {/* Views and Likes */}
                      <div className="mt-2 flex gap-4 text-xs text-gray-400">
                        <span>
                          👁 {article.views ?? 0}{" "}
                          {(article.views ?? 0) === 1
                            ? "View"
                            : "Views"}
                        </span>

                        <span>
                          ♥ {article.likes ?? 0}{" "}
                          {(article.likes ?? 0) === 1
                            ? "Like"
                            : "Likes"}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 italic">
                    Articles coming soon...
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Database error */}
      {error && (
        <p className="mt-8 text-center text-sm text-red-500">
          Unable to load articles at the moment.
        </p>
      )}
    </section>
  );
}