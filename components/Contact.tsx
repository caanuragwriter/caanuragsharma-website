import { FaWhatsapp } from "react-icons/fa";
export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-slate-900 text-white py-24"
    >
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center">

          <h2 className="text-4xl font-bold">
            Contact
          </h2>

          <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
            For professional enquiries, publications, training programmes or
            knowledge-sharing sessions, feel free to get in touch.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <div className="bg-slate-800 rounded-2xl p-8">
            <h3 className="text-xl font-semibold">Email</h3>

            <p className="mt-4 text-slate-300">
              ca.anurag015@gmail.com
            </p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-8">
            <h3 className="text-xl font-semibold">X (Twitter)</h3>

            <p className="mt-4 text-slate-300">
              @caanuragwriter
            </p>
          </div><div className="bg-slate-800 rounded-2xl p-8">
  <div className="flex items-center gap-3">
    <FaWhatsapp className="text-3xl text-green-500" />
    <h3 className="text-xl font-semibold">WhatsApp</h3>
  </div>

  <a
    href="https://wa.me/9463837398"
    target="_blank"
    rel="noopener noreferrer"
    className="mt-4 block text-blue-300 hover:text-white transition"
  >
    Chat on WhatsApp
  </a>
</div>

          <div className="bg-slate-800 rounded-2xl p-8">
  <h3 className="text-xl font-semibold">LinkedIn</h3>

  <a
    href="https://www.linkedin.com/in/ca-anurag-sharma-562810169/"
    target="_blank"
    rel="noopener noreferrer"
    className="mt-4 block text-blue-300 hover:text-white transition"
  >
    View LinkedIn Profile
  </a>
</div>

        </div>

      </div>
    </section>
  );
}