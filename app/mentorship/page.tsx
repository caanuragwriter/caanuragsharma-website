import Navbar from "../../components/Navbar";
import Mentorship from "../../components/Mentorship";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Professional Mentorship | CA Anurag Sharma",
  description:
    "One-to-one mentorship for CA students, newly qualified Chartered Accountants and finance professionals.",
};

export default function MentorshipPage() {
  return (
    <>
      <Navbar />

      <main className="pt-8">
        <Mentorship />
      </main>

      <Footer />
    </>
  );
}