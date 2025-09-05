import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';
import { useQuestProgress } from '@/context/QuestProgressContext';
import { useAudio } from '@/context/AudioContext';
import { toast } from 'sonner';
import { submitToWaitlist } from '@/utils/webhookUtils';

const backgroundImageUrl = "/lovable-uploads/9c6e9d53-ddf7-40da-8e06-988b6ae58bff.png";

export default function CallToActionSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sectionRef, animationClasses, isVisible] = useAnimateOnScroll<HTMLElement>();
  const { addProgress } = useQuestProgress();
  const { playSound } = useAudio();

  useEffect(() => {
    if (isVisible) {
      addProgress('VIEW_CTA');
    }
  }, [isVisible, addProgress]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    console.log('Final CTA signup:', email);
    
    try {
      const result = await submitToWaitlist({
        email: email,
        source: 'final-cta'
      });

      if (result.success) {
        setIsSubmitted(true);
        playSound('success', 0.5);
        addProgress('SUBMIT_FINAL_CTA');
        
        toast.success('Quest Accepted!', {
          description: 'You\'re now on the priority waitlist for the next AgentCamp retreat!',
        });
      } else {
        toast.error('Failed to join waitlist', {
          description: result.error || 'Please try again later.',
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('Something went wrong', {
        description: 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden snap-start ${animationClasses}`}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('${backgroundImageUrl}')`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

      {/* Main Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
          Ready to Transform Your
          <br />
          <span className="text-primary">Ideas Into Income?</span>
        </h2>

        <p className="text-xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto">
          Join the waitlist for AgentCamp's next retreat and start your journey from AI beginner to profitable creator.
        </p>

        {/* Final CTA Form */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto mb-16">
            <Input
              type="email"
              placeholder="Enter your email for early access"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/30 text-white placeholder:text-white/70 backdrop-blur-sm flex-1 h-12 focus:ring-primary focus:border-primary"
              required
              disabled={isLoading}
            />
            <Button 
              type="submit"
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap h-12"
              disabled={isLoading}
            >
              <Mail className="mr-2 h-5 w-5" />
              {isLoading ? 'Securing...' : 'Secure My Spot'}
            </Button>
          </form>
        ) : (
          <div className="bg-primary/20 border border-primary/30 rounded-lg p-8 max-w-lg mx-auto mb-16 backdrop-blur-sm">
            <p className="text-white font-semibold text-lg">🎉 Quest Accepted!</p>
            <p className="text-white/80 mt-2">You're now on the priority waitlist. Watch for your invitation to the next AgentCamp retreat!</p>
          </div>
        )}

        {/* Benefits List */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 text-white">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/15 transition-all duration-300">
            <div className="text-2xl mb-2">🏝️</div>
            <h3 className="font-semibold mb-2">Tropical Locations</h3>
            <p className="text-sm text-white/80">Build AI projects in paradise while surrounded by like-minded creators</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/15 transition-all duration-300">
            <div className="text-2xl mb-2">🧙‍♂️</div>
            <h3 className="font-semibold mb-2">Expert Guild Masters</h3>
            <p className="text-sm text-white/80">Learn from successful AI entrepreneurs and master builders</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/15 transition-all duration-300">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold mb-2">Real Income Quests</h3>
            <p className="text-sm text-white/80">Ship profitable AI projects during your 7-day adventure</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-white/60 text-sm">
          <Link to="/privacy-policy" className="hover:text-white/80 cursor-pointer transition-colors">
            Privacy Policy
          </Link>
          <span className="mx-2">|</span>
          <Link to="/terms-of-service" className="hover:text-white/80 cursor-pointer transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </section>
  );
}
