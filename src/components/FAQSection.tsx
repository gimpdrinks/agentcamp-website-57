import React, { useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';
import { useQuestProgress } from '@/context/QuestProgressContext';

const faqs = [
  {
    question: 'How Do I Begin My AgentCamp Journey?',
    answer: 'Starting your AgentCamp adventure is simple! Join our waitlist to receive early access to retreat dates and locations. Once accepted, you\'ll choose your class (Builder, Alchemist, or Explorer), join a guild, and receive your personalized quest roadmap before the retreat begins.',
  },
  {
    question: 'What Kind of AI Projects Will I Actually Build?',
    answer: 'You\'ll build real, income-generating AI projects like SaaS applications, automation tools, content generation systems, and AI-powered marketplaces. Each project is designed to be shipped during or immediately after the retreat, with many participants earning their first AI income within weeks.',
  },
  {
    question: 'Do I Need Advanced Coding Skills to Participate?',
    answer: 'While basic programming knowledge is helpful, AgentCamp is designed for all skill levels. Our quest-based curriculum adapts to your experience, and you\'ll be paired with complementary guild members. Many successful participants started as complete beginners.',
  },
  {
    question: 'How Much Does AgentCamp Cost and What\'s Included?',
    answer: 'Retreat pricing varies by location and duration (3-7 days). All packages include accommodation, meals, expert mentorship, lifetime community access, and exclusive AI tools and resources. Early bird pricing starts at $2,997. Payment plans available.',
  },
  {
    question: 'What Happens After the Retreat Ends?',
    answer: 'The adventure continues! You\'ll have lifetime access to our community platform, monthly virtual guild meetings, ongoing quest releases, and exclusive "loot drops" of new AI tools and workflows. Many participants form lasting business partnerships and continue collaborating on projects.',
  },
];

export default function FAQSection() {
  const [sectionRef, animationClasses, isVisible] = useAnimateOnScroll<HTMLElement>();
  const { addProgress } = useQuestProgress();

  useEffect(() => {
    if (isVisible) {
      addProgress('VIEW_FAQ');
    }
  }, [isVisible, addProgress]);

  return (
    <section ref={sectionRef} className={`py-20 px-6 bg-background snap-start ${animationClasses}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Introductory Text */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight text-center lg:text-left">
              Arcus' Wisdom:
              <br />
              <span className="text-primary">Common Quests</span>
              <br />
              <span className="text-secondary">& Lore</span>
            </h2>
            
            <h3 className="text-xl font-semibold text-primary text-center lg:text-left">
              Your Questions, Answered
            </h3>
            
            <p className="text-muted-foreground text-lg leading-relaxed text-center lg:text-left">
              Curious about your AgentCamp adventure? Here are answers to the most common questions from 
              aspiring AI builders, indie hackers, and creative entrepreneurs. If you need more guidance, 
              our Guild Masters are always ready to help chart your course to AI mastery.
            </p>
          </div>

          {/* Right Column - FAQ Accordion */}
          <div>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-border/50 rounded-lg px-6 bg-card/30 backdrop-blur-sm transition-all duration-300 hover:border-primary/50"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary transition-colors hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
