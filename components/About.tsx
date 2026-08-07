export default function About() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-blue-900">
            About Me
          </h2>

          <p className="text-xl text-gray-600 mt-6 max-w-4xl mx-auto leading-9">
            I am a Chartered Accountant with over decade of professional
            experience in finance, taxation, corporate law and business
            advisory. Beyond my professional practice, I am passionate about
            simplifying complex financial and legal concepts through practical
            writing.

            <br /><br />

            Through my articles, books and professional guidance, I aim to make
            Income Tax, GST, MSME laws, Corporate Law, Excel and Artificial
            Intelligence easier to understand for students, professionals,
            entrepreneurs and businesses.

            <br /><br />

            My mission is simple—
            <span className="font-semibold text-blue-700">
              {" "}
              to simplify finance and taxation for everyone.
            </span>
          </p>
        </div>

        {/* Highlights */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">

          <div className="bg-blue-50 rounded-2xl p-8 shadow hover:shadow-xl transition">
            <div className="text-5xl mb-4">💼</div>

            <h3 className="text-xl font-bold text-blue-900">
              10+ Years
            </h3>

            <p className="text-gray-600 mt-3">
              Experience in Finance, Taxation and Corporate Advisory.
            </p>
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 shadow hover:shadow-xl transition">
            <div className="text-5xl mb-4">✍️</div>

            <h3 className="text-xl font-bold text-blue-900">
              Finance Writer
            </h3>

            <p className="text-gray-600 mt-3">
              Writing practical articles on GST, Income Tax, MSME, Corporate
              Law and AI for Finance.
            </p>
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 shadow hover:shadow-xl transition">
            <div className="text-5xl mb-4">📚</div>

            <h3 className="text-xl font-bold text-blue-900">
              Published Author
            </h3>

            <p className="text-gray-600 mt-3">
              Author of multiple books covering corporate life, finance,
              taxation and literature.
            </p>
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 shadow hover:shadow-xl transition">
            <div className="text-5xl mb-4">🤖</div>

            <h3 className="text-xl font-bold text-blue-900">
              AI & Excel
            </h3>

            <p className="text-gray-600 mt-3">
              Passionate about using AI and Excel to improve finance and
              accounting workflows.
            </p>
          </div>

        </div>

        {/* Published Books */}

        <div>

          <h2 className="text-4xl font-bold text-center text-blue-900 mb-14">
            Published Books
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="bg-white border rounded-2xl p-8 shadow hover:shadow-xl transition">
              <h3 className="text-2xl font-bold text-blue-900">
                📘 2+2 = 20
              </h3>

              <p className="text-gray-600 mt-3">
                The Corporate Maths
              </p>
            </div>

            <div className="bg-white border rounded-2xl p-8 shadow hover:shadow-xl transition">
              <h3 className="text-2xl font-bold text-blue-900">
                📗 Mirage in the Mountains
              </h3>

              <p className="text-gray-600 mt-3">
                A fiction novel.
              </p>
            </div>

            <div className="bg-white border rounded-2xl p-8 shadow hover:shadow-xl transition">
              <h3 className="text-2xl font-bold text-blue-900">
                📙 Reflections – The World As I Feel
              </h3>

              <p className="text-gray-600 mt-3">
                A collection of poems and reflections.
              </p>
            </div>

            <div className="bg-white border rounded-2xl p-8 shadow hover:shadow-xl transition">
              <h3 className="text-2xl font-bold text-blue-900">
                📕 Credit Analysis
              </h3>

              <p className="text-gray-600 mt-3">
                Practical concepts on banking and credit analysis.
              </p>
            </div>

            <div className="bg-white border rounded-2xl p-8 shadow hover:shadow-xl transition">
              <h3 className="text-2xl font-bold text-blue-900">
                📔 Basics of Finance and Taxation
              </h3>

              <p className="text-gray-600 mt-3">
                An introductory guide to finance and taxation.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}