import { Button } from "@/components/ui/button";
import { trackStartEligibility } from "@/lib/gtag";
import { CheckCircle, Shield, Users, Clock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import heroImage from "@/assets/hero-family.jpg";
import nhifBanner from "@/assets/nhif-banner.png";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <>
      <Navbar />
      <section className="relative min-h-screen bg-gradient-bg overflow-hidden">
        {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Family healthcare coverage" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white">
              <Shield className="w-5 h-5 text-success" />
              <span className="text-sm font-medium">Government Approved Refund Portal</span>
            </div>

            {/* Main Headlines */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                <span className="text-white font-extrabold">Bima Bora</span>
                <br />
                <span className="text-3xl lg:text-4xl">Afya BORA!</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                Universal health coverage (UHC) means that all people have access to the health services they need, when and where they need them, without financial hardship.
              </p>
            </div>

            {/* Value Proposition */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold text-white">Average Refund: Ksh 15,000 - Ksh 45,000</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">95%</div>
                  <div className="text-sm text-white/80">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">3-5</div>
                  <div className="text-sm text-white/80">Working Days</div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="space-y-4">
              <Button 
                onClick={() => { trackStartEligibility('hero'); onGetStarted(); }}
                variant="danger"
                className="animate-pulse-glow"
              >
                Check if you qualify - FREE
              </Button>
              <p className="text-sm text-white/70">
                ✓ No upfront fees • ✓ Secure process • ✓ Government approved
              </p>
            </div>
          </div>

          {/* Right Column - Trust Indicators */}
          <div className="space-y-6 animate-slide-up">
            {/* Quick Benefits */}
            <div className="bg-white rounded-lg p-6 shadow-strong">
              <h3 className="text-xl font-bold text-foreground mb-4">Why Choose Our Service?</h3>
              <div className="space-y-3">
                {[
                  "Instant eligibility check",
                  "Secure government-approved process",
                  "No hidden fees or charges",
                  "Expert claim processing"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Proof */}
            <div className="relative bg-transparent rounded-lg p-6 text-foreground overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img 
                  src={nhifBanner} 
                  alt="NHIF Banner" 
                  className="w-full h-full object-cover"
                />
                
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-6 h-6" />
                  <h4 className="font-semibold">Join 15,000+ Satisfied Customers</h4>
                </div>
                <p className="text-success-light mb-3">
                  "Received Ksh 28,540 refund in just 4 days. The process was smooth and transparent."
                </p>
                <div className="text-sm opacity-90">- Sarah M., Nairobi</div>
              </div>
            </div>

            {/* Urgency */}
            <div className="bg-warning rounded-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-6 h-6" />
                <h4 className="font-semibold">Limited Time Offer</h4>
              </div>
              <p className="text-warning-light">
                Claim deadline: December 2024. Don't miss out on your rightful refund!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 animate-float hidden lg:block">
        <div className="w-3 h-3 bg-success rounded-full opacity-60"></div>
      </div>
      <div className="absolute bottom-32 left-20 animate-float hidden lg:block" style={{ animationDelay: '1s' }}>
        <div className="w-2 h-2 bg-warning rounded-full opacity-70"></div>
      </div>
      </section>
    </>
  );
};