import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { TrustSection } from "@/components/TrustSection";
import { ProcessSection } from "@/components/ProcessSection";
import { RefundCalculator } from "@/components/RefundCalculator";

const Index = () => {
  const [showCalculator, setShowCalculator] = useState(false);

  const handleGetStarted = () => {
    setShowCalculator(true);
  };

  if (showCalculator) {
    return <RefundCalculator />;
  }

  return (
    <div className="min-h-screen">
      <HeroSection onGetStarted={handleGetStarted} />
      <TrustSection />
      <ProcessSection onGetStarted={handleGetStarted} />
    </div>
  );
};

export default Index;
