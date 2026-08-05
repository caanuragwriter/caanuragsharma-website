export default function Books() {
  const books = [
    {
      title: "2+2 = 20 (The Corporate Maths)",
      desc: "A humorous take on corporate life, office politics and the realities of the corporate world.",
      badge: "⭐ Featured",
      amazon: "#",
      color: "bg-blue-700",
    },
    {
      title: "Mirage in the Mountains",
      desc: "A fiction novel exploring life, emotions and human relationships.",
      badge: "",
      amazon: "#",
      color: "bg-green-600",
    },
    {
      title: "Reflections – The World as I Feel",
      desc: "A collection of poems and reflections on life and society.",
      badge: "",
      amazon: "#",
      color: "bg-purple-600",
    },
    {
      title: "Credit Analysis",
      desc: "A practical guide to analysing financial statements and evaluating creditworthiness.",
      badge: "",
      amazon: "#",
      color: "bg-orange-600",
    },
    {
      title: "Basics of Finance and Taxation",
      desc: "An introductory guide for students and professionals beginning their finance journey.",
      badge: "",
      amazon: "#",
      color: "bg-red-600",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-blue-900">
            Published Books
          </h2>

          <p className="text-gray-600 text-xl mt-5 max-w-3xl mx-auto">
            Writing has always been my passion. These books reflect my
            professional experience, creativity and love for knowledge sharing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {books.map((book, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"
            >

              <div className={`${book.color} h-56 flex items-center justify-center text-white text-2xl font-bold text-center px-6`}>
                {book.title}
              </div>

              <div className="p-8">

                {book.badge && (
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {book.badge}
                  </span>
                )}

                <h3 className="text-2xl font-bold text-blue-900 mt-5">
                  {book.title}
                </h3>

                <p className="text-gray-600 mt-4 leading-7">
                  {book.desc}
                </p>

                <a
                  href={book.amazon}
                  target="_blank"
                  className="inline-block mt-8 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  View on Amazon →
                </a>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}