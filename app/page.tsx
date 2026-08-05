import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import WhyChooseSection from "../components/WhyChooseSection";
import Books from "../components/Books";
import LatestArticles from "../components/LatestArticles";
import LatestJobs from "../components/LatestJobs";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <WhyChooseSection />
      <Books />
      <LatestArticles />
      <LatestJobs />
      <Newsletter />
      <Footer />
    </>
  );
}