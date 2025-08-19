import { Shield, Award, Users, CheckCircle, Star, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import trustShield from "@/assets/trust-shield.jpg";
import refundIllustration from "@/assets/refund-illustration.jpg";
import shifLogo from "@/assets/shif-logo.jpeg";
import nhifKenya from "@/assets/nhif-kenya.png";
import claimsProcessed from "@/assets/claims-processed.png";
import nhifBanner from "@/assets/nhif-banner.png";

export const TrustSection = () => {
  const testimonials = [
    {
      name: "Mary Wanjiku",
      location: "Kiambu",
      amount: "Ksh 32,150",
      days: 4,
      quote: "I couldn't believe it was this easy. Got my refund for my maternity expenses from 2022.",
      rating: 5
    },
    {
      name: "John Ochieng",
      location: "Kisumu", 
      amount: "Ksh 18,750",
      days: 3,
      quote: "Surgery refund processed quickly. Professional and transparent service.",
      rating: 5
    },
    {
      name: "Grace Muthoni",
      location: "Mombasa",
      amount: "Ksh 41,200",
      days: 5,
      quote: "Recovered funds from multiple hospital visits. Highly recommend this service.",
      rating: 5
    }
  ];

  const trustIndicators = [
    {
      icon: Shield,
      title: "Government Approved",
      description: "Officially recognized by NHIF and Ministry of Health",
      color: "text-primary",
      image: shifLogo
    },
    {
      icon: Award,
      title: "Licensed Service Provider",
      description: "Certified claim processing with full regulatory compliance",
      color: "text-success",
      image: nhifKenya
    },
    {
      icon: Users,
      title: "15,000+ Claims Processed",
      description: "Over Ksh 450 million successfully refunded to Kenyans",
      color: "text-trust-gold",
      image: claimsProcessed
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trusted by <span className="text-primary">Thousands</span> of Kenyans
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our proven track record speaks for itself. Join the growing community of Kenyans who have successfully recovered their NHIF refunds.
          </p>
        </div>

        {/* Trust Indicators Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {trustIndicators.map((indicator, index) => {
            const IconComponent = indicator.icon;
            return (
              <Card key={index} className="p-6 text-center hover:shadow-medium transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <img 
                  src={indicator.image} 
                  alt={indicator.title}
                  className="w-36 h-36 mx-auto mb-4 object-contain rounded-lg"
                />
                <h3 className="font-semibold text-foreground mb-2">{indicator.title}</h3>
                <p className="text-sm text-muted-foreground">{indicator.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Visual Trust Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-3xl font-bold text-foreground">
              Your Money, <span className="text-success">Secured</span>
            </h3>
            <p className="text-lg text-muted-foreground">
              We understand the importance of trust when dealing with financial matters. Our platform employs bank-level security and is fully compliant with Kenyan financial regulations.
            </p>
            
            <div className="space-y-4">
              {[
                "256-bit SSL encryption for all transactions",
                "No upfront payments required",
                "Transparent fee structure",
                "Money-back guarantee if claim fails",
                "Direct communication with NHIF officials"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img 
              src={trustShield} 
              alt="Security and trust" 
              className="rounded-lg shadow-medium hover:shadow-strong transition-shadow duration-300"
            />
            <img 
              src={refundIllustration} 
              alt="Refund process" 
              className="rounded-lg shadow-medium hover:shadow-strong transition-shadow duration-300 mt-8"
            />
          </div>
        </div>

        {/* Testimonials */}
        <div className="space-y-8">
          <h3 className="text-3xl font-bold text-center text-foreground">
            Real People, <span className="text-success">Real Refunds</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-medium transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                {/* Rating */}
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-muted-foreground italic mb-4">"{testimonial.quote}"</p>
                
                {/* Refund Amount */}
                <div className="bg-success-light rounded-lg p-3 mb-4 text-center">
                  <div className="text-2xl font-bold text-success">{testimonial.amount}</div>
                  <div className="text-sm text-success">Refunded in {testimonial.days} days</div>
                </div>
                
                {/* Author */}
                <div className="text-sm">
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-muted-foreground">{testimonial.location}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 bg-gradient-primary rounded-lg p-8 text-white text-center">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold mb-2">Ksh 450M+</div>
              <div className="text-primary-light">Total Refunded</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">15,000+</div>
              <div className="text-primary-light">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-primary-light">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">4.8★</div>
              <div className="text-primary-light">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};