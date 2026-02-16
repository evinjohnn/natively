import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import StepsSection from "@/components/StepsSection";
import TranscriptionSection from "@/components/TranscriptionSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <StepsSection />
        <TranscriptionSection />
        <FAQSection />
        <CTASection />
      </main>
    </div>
  );
};

export default Index;
