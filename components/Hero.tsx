import Image from "next/image";

export default function Hero() {
  const practiceAreas = [
    "GST Advisory",
    "Income Tax",
    "Corporate Compliance",
    "Finance Consulting",
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-white pt-32 pb-24">

      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-blue-100 blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <div>

            <div className="inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-800 tracking-wide">
              CHARTERED ACCOUNTANT • AUTHOR • FINANCE EDUCATOR
            </div>

            <h1 className="mt-8 text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
              CA Anurag
              <br />
              Sharma
            </h1>

            <div className="mt-6 h-1 w-24 rounded-full bg-blue-700"></div>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">
  Chartered Accountant with professional experience in finance,
  taxation, corporate compliance and advisory. Author of publications
  on finance and corporate life, with a focus on knowledge sharing
  through technical writing and professional training.
</p>

            <div className="mt-10 flex flex-wrap gap-4">

              <a
                href="#publications"
                className="rounded-xl bg-blue-700 px-8 py-4 font-semibold text-white hover:bg-blue-800 transition"
              >
                View Publications
              </a>

              <a
                href="#knowledge"
                className="rounded-xl border-2 border-blue-700 px-8 py-4 font-semibold text-blue-700 hover:bg-blue-700 hover:text-white transition"
              >
                Knowledge Hub
              </a>

            </div>

            <div className="mt-14">

              <p className="text-sm uppercase tracking-[0.2em] text-gray-500 font-semibold">
                Areas of Practice
              </p>

              <div className="mt-5 flex flex-wrap gap-3">

                {practiceAreas.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white border border-gray-200 px-5 py-2 shadow-sm"
                  >
                    {item}
                  </span>
                ))}

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative flex justify-center">

            <div className="absolute w-[520px] h-[520px] rounded-full bg-blue-100 opacity-40 blur-3xl"></div>

            <div className="absolute right-0 top-10 h-56 w-56 rounded-full border-[28px] border-blue-100"></div>

            <Image
              src="/images/anurag.jpg"
              alt="CA Anurag Sharma"
              width={520}
              height={620}
              priority
              className="relative rounded-[32px] border-8 border-white shadow-2xl"
            />

          </div>

        </div>

      </div>
          </section>
  );
}