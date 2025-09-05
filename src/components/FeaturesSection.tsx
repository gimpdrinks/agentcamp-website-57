
import React, { useEffect } from 'react';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';
import { useQuestProgress } from '@/context/QuestProgressContext';

const images = [
  '/lovable-uploads/7b8dd7b5-74b8-4000-89a4-6ab318460976.png',
  '/lovable-uploads/79c12490-996f-436a-8c11-f74055eaea19.png',
  '/lovable-uploads/04adc5ae-83e0-4bc3-8760-02fd285010b5.png',
  '/lovable-uploads/3e1b9c39-e70d-4b65-ac45-1a98d01e8c7d.png',
  '/lovable-uploads/f9c0cf8a-f09e-40f7-b39c-bf3bb027d409.png',
  '/lovable-uploads/703c3073-5089-481a-bb3a-846312ec2a59.png',
];

export default function FeaturesSection() {
  const [sectionRef, animationClasses, isVisible] = useAnimateOnScroll<HTMLElement>();
  const { addProgress } = useQuestProgress();

  useEffect(() => {
    if (isVisible) {
      addProgress('VIEW_FEATURES');
    }
  }, [isVisible, addProgress]);

  return (
    <section ref={sectionRef} className={`py-20 px-6 bg-background snap-start ${animationClasses}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight text-center lg:text-left">
              Discover Your
              <br />
              <span className="text-primary">AI Mastery Path</span>
              <br />
              <span className="text-primary/90">Through Quests</span>
            </h2>
            
            <h3 className="text-xl font-semibold text-primary text-center lg:text-left">
              Quest-Based Learning That Actually Works
            </h3>
            
            <p className="text-muted-foreground text-lg leading-relaxed text-center lg:text-left">
              Forget boring tutorials and theoretical courses. AgentCamp's quest-based curriculum guides you through 
              building real AI projects step-by-step. From your first AI automation to launching a profitable SaaS, 
              each quest unlocks new skills and brings you closer to AI mastery. Choose your class, join a guild, 
              and start earning while you learn.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Hands-on Quests</div>
              </div>
              <div className="text-center p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                <div className="text-2xl font-bold text-secondary">$10K+</div>
                <div className="text-sm text-muted-foreground">Avg. Project Value</div>
              </div>
            </div>
          </div>

          {/* Right Column - Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div 
                key={index}
                className={`relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-2 ${
                  index === 0 ? 'col-span-2 h-48' : 
                  index === 1 || index === 2 ? 'h-32' :
                  index === 3 ? 'col-span-2 h-40' :
                  'h-32'
                }`}
              >
                <img
                  src={image}
                  alt={`AI Quest Environment ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-2 left-3 text-white text-xs font-semibold tracking-wide" style={{textShadow: '0 1px 3px rgba(0,0,0,0.7)'}}>
                  {index === 0 && "Main Quest Hub"}
                  {index === 1 && "Builder's Workshop"}
                  {index === 2 && "Quest Hub & Roadmap"}
                  {index === 3 && "Guild Collaboration Space"}
                  {index === 4 && "Alchemist Lab"}
                  {index === 5 && "Skill Tree Sanctuary"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
