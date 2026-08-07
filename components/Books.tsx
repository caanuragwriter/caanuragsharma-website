import BookCard from "./BookCard";

const books = [{
  title: "2+2 = 20 (The Corporate Maths)",
  image: "/images/books/corporate-maths.jpeg",
  description:
    "A humorous and insightful look at corporate life through real experiences, satire and workplace stories.",
  button: "View on Amazon",
  link: "https://www.amazon.in/2-20-Corporate-Maths/dp/9370462929",
},
  {
    title: "Mirage in the Mountains",
    description:
      "A fiction novel exploring emotions, aspirations and the journey of life.",
    image: "/images/books/mirage.jpeg",
    button: "Buy on Amazon",
    link: "https://www.amazon.com/dp/9388930002?lv=shuf&channelId=510&plpRedirect=mhFallback",
  },
  {
    title: "Reflections – The World as I Feel",
    description:
      "A collection of poems and reflections capturing life's emotions and experiences.",
    image: "/images/books/reflections.jpeg",
    button: "Buy on Amazon",
    link: "https://www.amazon.in/REFLECTIONS-world-as-I-feel/dp/9363308545/",
  },
  {
    title: "Credit Analysis",
    description:
      "A practical handbook on financial statement analysis and credit evaluation.",
    image: "/images/books/credit-analysis.jpeg",
    button: "Buy on Amazon",
    link: "https://www.amazon.in/CREDIT-ANALYSIS-HANDBOOK-ANURAG-SHARMA-ebook/dp/B09KZLQSV8",
  },
  {
    title: "Basic Concepts Relating to Finance & Taxation",
    description:
      "A practical publication introducing the fundamentals of finance and taxation.",
    image: "/images/books/finance-taxation.jpeg",
    button: "Read on CAclubIndia",
    link: "https://www.caclubindia.com/share_files/basic-concepts-relating-to-finance-and-taxation-82406.asp",
  },
];

export default function Books() {
  return (
    <section id="books" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center text-gray-900">
          Books by CA Anurag Sharma 
        </h2>

        <p className="text-center text-gray-600 mt-4 max-w-3xl mx-auto">
          Sharing knowledge through books on Corporate Life, Finance,
          Credit Analysis, Fiction and Poetry.
        </p>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {books.map((book, index) => (
            <BookCard key={index} {...book} />
          ))}
        </div>
      </div>
    </section>
  );
}