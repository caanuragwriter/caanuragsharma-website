import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import LatestArticles from "../components/LatestArticles";
import Services from "../components/Services";
import LatestJobs from "../components/LatestJobs";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <LatestArticles />
      <Services />
      <LatestJobs />
      <Newsletter />
      <Footer />
    </>
  );
}