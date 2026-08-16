import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ArticleEngagement from "../../../components/ArticleEngagement";
import { createClient } from "../../../utils/supabase/server";
import { notFound } from "next/navigation";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArticlePage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !article) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 pt-24">
        <article className="max-w-4xl mx-auto px-6 py-12">

          {/* Category */}
          <p className="text-blue-700 font-semibold uppercase tracking-wide">
            {article.category}
          </p>

          {/* Title */}
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">
            {article.title}
          </h1>

          {/* Description */}
          {article.description && (
            <p className="mt-5 text-lg text-gray-600 leading-8">
              {article.description}
            </p>
          )}

          {/* Article Meta */}
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-500">
            <span>CA Anurag Sharma</span>
            <span>•</span>
            <span>
              {new Date(article.created_at).toLocaleDateString("en-IN", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Views & Likes */}
          <ArticleEngagement
            slug={article.slug}
            initialViews={article.views ?? 0}
            initialLikes={article.likes ?? 0}
          />

          {/* Article Image */}
          {article.image && (
            <div className="mt-10">
              <img
                src={article.image}
                alt={article.title}
                className="w-full rounded-2xl shadow-md"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="mt-10 prose prose-lg max-w-none">

            <h2>Clause 22 – Form 3CD</h2>

            <p>
              Clause 22 of Form 3CD deals with payments to Micro and Small
              Enterprises covered under the MSMED Act, 2006 and the related
              tax implications under Section 43B(h) of the Income-tax Act.
            </p>

            <h2>What is reported under Clause 22?</h2>

            <p>
              Clause 22 requires reporting of certain amounts relating to
              Micro and Small Enterprises and the payments made to them during
              the financial year.
            </p>

            <ul>
              <li>
                Amount of interest inadmissible under the MSMED Act.
              </li>

              <li>
                Total amount required to be paid to Micro and Small
                Enterprises during the previous year.
              </li>

              <li>
                Amount paid within the time limit prescribed under Section 15
                of the MSMED Act.
              </li>

              <li>
                Amount not paid within the prescribed time limit and subject
                to disallowance under Section 43B(h).
              </li>
            </ul>

            <h2>Payment Time Limit</h2>

            <p>
              Where there is no written agreement, payment is generally
              required within 15 days from the date of acceptance or deemed
              acceptance.
            </p>

            <p>
              Where a written agreement exists, payment must be made within
              the agreed period, subject to the statutory maximum period of
              45 days.
            </p>

            <h2>Tax Effect under Section 43B(h)</h2>

            <p>
              Amounts payable to Micro and Small Enterprises beyond the
              prescribed payment period may attract disallowance under
              Section 43B(h).
            </p>

            <p>
              The deduction is generally allowed in the year in which the
              payment is actually made, subject to the applicable provisions
              of the Income-tax Act.
            </p>

            <h2>Important</h2>

            <p>
              Taxpayers and tax professionals should examine the underlying
              transactions, acceptance dates, agreed payment terms and actual
              payment dates rather than relying only on the closing
              outstanding balance.
            </p>

            <p>
              Proper reconciliation between the books of account, vendor
              records and tax computation is important while preparing Form
              3CD.
            </p>

          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}