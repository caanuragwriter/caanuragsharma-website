import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}
          <div>

            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium mb-6">
              Chartered Accountant • Finance Writer • Author
            </span>

            <h1 className="text-5xl lg:text-7xl font-bold text-blue-900 leading-tight">
              CA Anurag Sharma
            </h1>

            <p className="text-xl text-gray-600 mt-6 leading-8">
              Helping businesses and professionals understand
              <span className="font-semibold text-blue-700">
                {" "}
                Income Tax, GST, MSME, Corporate Law, Excel and AI for Finance.
              </span>
            </p>

            <div className="flex gap-4 mt-10">

              <button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition">
                Read Articles
              </button>

              <button className="border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white px-8 py-4 rounded-xl font-semibold transition">
                Book Consultation
              </button>

            </div>

            <div className="flex flex-wrap gap-3 mt-10">

              <span className="bg-white shadow-md px-4 py-2 rounded-full">
                GST
              </span>

              <span className="bg-white shadow-md px-4 py-2 rounded-full">
                Income Tax
              </span>

              <span className="bg-white shadow-md px-4 py-2 rounded-full">
                MSME
              </span>

              <span className="bg-white shadow-md px-4 py-2 rounded-full">
                Corporate Law
              </span>

              <span className="bg-white shadow-md px-4 py-2 rounded-full">
                AI for Finance
              </span>

            </div>

          </div>

          {/* Right Side */}
          <div className="flex justify-center">

            <div className="relative">

              <div className="absolute inset-0 bg-blue-400 blur-3xl opacity-20 rounded-full"></div>

              <Image
                src="/images/anurag.jpg"
                alt="CA Anurag Sharma"
                width={450}
                height={550}
                className="relative rounded-3xl shadow-2xl object-cover"
                priority
              />

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}