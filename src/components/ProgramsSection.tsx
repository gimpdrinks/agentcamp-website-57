import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';
import { useQuestProgress } from '@/context/QuestProgressContext';

interface Program {
  title: string;
  price: string;
  description: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
}

const programs: Program[] = [
  {
    title: "Free Webinar",
    price: "Free",
    description: "Get started with AI automation fundamentals and discover your potential path to building profitable AI solutions.",
    features: [
      "Introduction to AI automation",
      "Market opportunity overview", 
      "Basic tool demonstrations",
      "Q&A with expert mentors"
    ],
    ctaText: "Join Free Webinar"
  },
  {
    title: "Virtual Sprint",
    price: "$497",
    description: "Intensive 3-day online program where you'll build your first AI MVP with direct mentorship and peer collaboration.",
    features: [
      "3-day intensive online bootcamp",
      "Build your first AI MVP",
      "Direct mentor guidance",
      "Small group collaboration",
      "Project showcase opportunity"
    ],
    ctaText: "Start Sprint",
    isPopular: true
  },
  {
    title: "The Full Retreat",
    price: "$2,997", 
    description: "Immersive 7-day retreat experience where you'll transform your AI idea into a launch-ready business with ongoing support.",
    features: [
      "7-day immersive retreat experience",
      "Complete AI business development",
      "1-on-1 mentorship sessions",
      "Launch-ready MVP delivery",
      "6-month community access",
      "Investor network introductions"
    ],
    ctaText: "Reserve Spot"
  }
];

export default function ProgramsSection() {
  const [sectionRef, animationClasses, isVisible] = useAnimateOnScroll<HTMLElement>();
  const { addProgress } = useQuestProgress();

  useEffect(() => {
    if (isVisible) {
      addProgress('VIEW_FEATURES');
    }
  }, [isVisible, addProgress]);

  const scrollToCTA = () => {
    const ctaSection = document.querySelector('[data-section="cta"]');
    if (ctaSection) {
      ctaSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const handleProgramClick = (program: Program) => {
    if (program.title === "Free Webinar") {
      // Could handle differently for free webinar in future
      scrollToCTA();
    } else {
      scrollToCTA();
    }
  };

  return (
    <section ref={sectionRef} className={`py-20 px-6 bg-background snap-start ${animationClasses}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Choose Your
            <br />
            <span className="text-primary">Adventure Path</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From curious explorer to AI entrepreneur - select the program that matches your ambition and timeline.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {programs.map((program, index) => (
            <Card 
              key={index}
              className={`relative bg-card border-primary/20 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-primary/20 ${
                program.isPopular 
                  ? 'border-primary/50 shadow-primary/10 transform scale-105' 
                  : ''
              }`}
            >
              {program.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-foreground mb-2">
                  {program.title}
                </CardTitle>
                <div className="text-4xl font-bold text-primary mb-4">
                  {program.price}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {program.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {program.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={() => handleProgramClick(program)}
                  className={`w-full ${
                    program.isPopular 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : ''
                  }`}
                  size="lg"
                >
                  {program.ctaText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground text-sm">
            All programs include lifetime access to our community and resource library
          </p>
        </div>
      </div>
    </section>
  );
}