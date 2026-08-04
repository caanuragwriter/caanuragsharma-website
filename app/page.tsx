import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-6xl font-bold text-blue-900">
          CA Anurag Sharma
        </h1>

        <p className="text-2xl mt-6 text-gray-700">
          Chartered Accountant • Finance Writer • Author
        </p>

        <p className="mt-8 max-w-3xl text-lg text-gray-600">
          Welcome to my professional platform where I simplify
          Income Tax, GST, MSME, Finance, Corporate Law,
          Excel and AI for Finance.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="bg-blue-900 text-white px-6 py-3 rounded-lg">
            Read Articles
          </button>

          <button className="border border-blue-900 text-blue-900 px-6 py-3 rounded-lg">
            Book Consultation
          </button>
        </div>
      </main>
    </>
  );
}