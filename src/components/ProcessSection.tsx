import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trackStartEligibility } from "@/lib/gtag";
import { Search, FileText, CreditCard, CheckCircle, ArrowRight } from "lucide-react";

interface ProcessSectionProps {
  onGetStarted: () => void;
}

export const ProcessSection = ({ onGetStarted }: ProcessSectionProps) => {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Check Eligibility",
      description: "Enter your ID number and year of hospital service. Our AI system instantly checks NHIF records.",
      time: "30 seconds",
      color: "text-primary"
    },
    {
      number: "02", 
      icon: FileText,
      title: "Generate Documents",
      description: "AI creates your personalized claim form with secure barcode and all required documentation.",
      time: "2 minutes",
      color: "text-success"
    },
    {
      number: "03",
      icon: CreditCard,
      title: "Pay Processing Fee",
      description: "Small one-time fee (typically 6% of refund amount) to process your claim with NHIF.",
      time: "1 minute", 
      color: "text-warning"
    },
    {
      number: "04",
      icon: CheckCircle,
      title: "Receive Refund",
      description: "Your money is directly deposited to your bank account after successful processing.",
      time: "3-5 days",
      color: "text-success"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Simple <span className="text-primary">4-Step</span> Process
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We've streamlined the entire NHIF refund process. What used to take months of paperwork now takes just minutes.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border transform -translate-y-1/2 z-0"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card 
                  key={index} 
                  className="p-6 text-center hover:shadow-medium transition-all duration-300 bg-card border-2 hover:border-primary/20 animate-slide-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Step Number */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto">
                      {step.number}
                    </div>
                    <div className="absolute -top-2 -right-2">
                      <IconComponent className={`w-8 h-8 ${step.color} bg-card rounded-full p-1 border-2 border-card`} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{step.description}</p>
                  
                  {/* Time Badge */}
                  <div className="inline-flex items-center gap-1 bg-accent rounded-full px-3 py-1 text-xs font-medium text-accent-foreground">
                    <span>⏱️ {step.time}</span>
                  </div>

                  {/* Arrow for larger screens */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-primary" />
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-3xl font-bold text-foreground">
              Why Our Process <span className="text-success">Works</span>
            </h3>
            
            <div className="space-y-4">
              {[
                {
                  title: "AI-Powered Verification",
                  description: "Our advanced AI system cross-references multiple NHIF databases to ensure maximum accuracy."
                },
                {
                  title: "Legal Compliance", 
                  description: "All documentation meets NHIF requirements and government regulations."
                },
                {
                  title: "Direct NHIF Integration",
                  description: "We work directly with NHIF officials to expedite your claim processing."
                },
                {
                  title: "No Risk Guarantee",
                  description: "If your claim is rejected, we refund 100% of your processing fee."
                }
              ].map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">{benefit.title}</h4>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-hero rounded-lg p-8 text-white text-center animate-slide-up">
            <h4 className="text-2xl font-bold mb-4">Ready to Get Started?</h4>
            <p className="text-primary-light mb-6">
              Join thousands of Kenyans who have already recovered their NHIF refunds. The process is free to start and takes less than 5 minutes.
            </p>
            
            <div className="space-y-4">
              <Button 
                onClick={() => { trackStartEligibility('process'); onGetStarted(); }}
                variant="success"
                size="lg"
                className="w-full font-bold"
              >
                Start Your Free Eligibility Check
              </Button>
              
              <div className="flex items-center justify-center gap-4 text-sm text-primary-light">
                <span>✓ No upfront costs</span>
                <span>✓ Secure process</span>
                <span>✓ Instant results</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Teaser */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Still Have Questions?
          </h3>
          <p className="text-muted-foreground mb-6">
            Our customer support team is ready to help you understand the process better.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-card rounded-lg p-3 border">
              <span className="text-sm font-medium text-foreground">📞 0700 123 456</span>
            </div>
            <div className="bg-card rounded-lg p-3 border">
              <span className="text-sm font-medium text-foreground">✉️ support@nhifrefund.co.ke</span>
            </div>
            <div className="bg-card rounded-lg p-3 border">
              <span className="text-sm font-medium text-foreground">💬 Live Chat Available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};