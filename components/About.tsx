export default function About() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-blue-900 mb-4">
          About Me
        </h2>

        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-14">
          Combining over a decade of professional experience with a passion for
          writing and knowledge sharing, I help individuals, businesses and
          finance professionals simplify complex laws and make better financial
          decisions.
        </p>

        <div className="grid md:grid-cols-2 gap-12">

          <div className="bg-gray-50 p-8 rounded-2xl shadow">

            <h3 className="text-2xl font-bold text-blue-800 mb-6">
              Professional Profile
            </h3>

            <ul className="space-y-4 text-gray-700">
              <li>✔ Chartered Accountant</li>
              <li>✔ 10+ Years of Professional Experience</li>
              <li>✔ Finance Writer</li>
              <li>✔ Author</li>
              <li>✔ GST & Income Tax Expert</li>
              <li>✔ Corporate Law Professional</li>
              <li>✔ Excel & AI for Finance Enthusiast</li>
            </ul>

          </div>

          <div className="bg-blue-50 p-8 rounded-2xl shadow">

            <h3 className="text-2xl font-bold text-blue-800 mb-6">
              My Mission
            </h3>

            <p className="text-lg text-gray-600 leading-8 mt-6">
I am a Chartered Accountant with over 10 years of professional experience in
finance, taxation, corporate law and business advisory. Beyond my professional
practice, I am passionate about simplifying complex financial and legal
concepts through practical writing.

I am the author of the following books:

• 2+2 = 20 (The Corporate Maths)<br />
• Mirage in the Mountains<br />
• Reflections – The World As I Feel<br />
• Credit Analysis<br />
• Basics of Finance and Taxation

My goal is to make finance, taxation and corporate laws easy to understand for
students, professionals and businesses.
</p>

          </div>

        </div>

      </div>
    </section>
  );
}