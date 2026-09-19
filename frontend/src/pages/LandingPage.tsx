import "../landing.css";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import TrustStrip from "../components/landing/TrustStrip";
import ProblemSection from "../components/landing/ProblemSection";
import HowItWorks from "../components/landing/HowItWorks";
import ProductShowcase from "../components/landing/ProductShowcase";
import FeatureSections from "../components/landing/FeatureSections";
import PrivacySection from "../components/landing/PrivacySection";
import FinalCTA from "../components/landing/FinalCTA";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="lp-root">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <ProblemSection />
        <HowItWorks />
        <ProductShowcase />
        <FeatureSections />
        <PrivacySection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
