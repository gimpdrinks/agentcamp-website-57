
import React, { useState, useEffect } from 'react';
import { useConversation } from '@11labs/react';
import { Mic, MicOff, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useQuestProgress } from '@/context/QuestProgressContext';
import { useAudio } from '@/context/AudioContext';

// IMPORTANT: This should be set to your ElevenLabs Agent ID from your ElevenLabs account.
// The agent should be configured with a prompt and a tool named `open_waitlist_modal` that accepts an `offer` parameter.
const ELEVENLABS_AGENT_ID = 'agent_01jxpffyj2e3qareeacw68q771';

const AIAgent: React.FC = () => {
  const [isVoiceSupported, setIsVoiceSupported] = useState(false);
  const [fallbackInput, setFallbackInput] = useState('');
  const { addProgress } = useQuestProgress();
  const { playSound } = useAudio();

  useEffect(() => {
    // Check for media devices support on component mount
    if (typeof window !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setIsVoiceSupported(true);
    }
  }, []);

  const scrollToCTA = () => {
    const ctaSection = document.querySelector('[data-section="cta"]');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const conversation = useConversation({
    agentId: ELEVENLABS_AGENT_ID,
    clientTools: {
      open_waitlist_modal: (params: { offer: string }) => {
        // Instead of opening a modal, scroll to CTA section
        scrollToCTA();
        return `Sure, let me take you to the sign-up section for the ${params.offer}.`;
      },
    },
    onMessage: (message) => {
      console.log('Agent message:', message);
    },
    onError: (error) => {
      console.error('Conversation error:', error);
      toast.error('An error occurred with the AI agent.', {
        description: 'Please check the console for details.',
      });
    },
  });

  const handleToggleConversation = async () => {
    playSound('button-click-2', 0.6);
    if (!ELEVENLABS_AGENT_ID) {
      toast.error('ElevenLabs Agent ID is not configured.', {
        description: 'Please add your Agent ID in src/components/AIAgent.tsx.',
      });
      return;
    }

    if (conversation.status === 'connected') {
      await conversation.endSession();
    } else {
      try {
        // Request microphone permissions before starting
        await navigator.mediaDevices.getUserMedia({ audio: true });
        await conversation.startSession({ agentId: ELEVENLABS_AGENT_ID });
        addProgress('INTERACT_AI');
      } catch (error) {
        console.error('Microphone access denied.', error);
        toast.error('Microphone access is required for the voice guide.');
        setIsVoiceSupported(false); // Fallback to text input if permission is denied
      }
    }
  };
  
  const handleFallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('button-click-1', 0.6);
    const input = fallbackInput.toLowerCase().trim();
    const validInputs = ['webinar', 'sprint', 'retreat'];
    const foundOffer = validInputs.find(offer => input.includes(offer));
    
    if (foundOffer) {
      scrollToCTA();
      addProgress('INTERACT_AI');
      setFallbackInput('');
    } else {
      toast.info("Please ask about 'Free Webinar', 'Virtual Sprint', or 'Full Retreat'.");
    }
  };

  const getStatusLabel = () => {
    if (conversation.status === 'connecting') return 'Connecting...';
    if (conversation.isSpeaking) return 'Arcus';
    if (conversation.status === 'connected') return 'Listening...';
    return 'Click to talk to Arcus, your AI guide';
  };

  if (!isVoiceSupported) {
    return (
      <div className="w-full max-w-sm mx-auto text-center mb-8">
        <p className="text-sm text-muted-foreground mb-2">
          Voice guide not available. You can ask about an offer below.
        </p>
        <form onSubmit={handleFallbackSubmit} className="flex items-center gap-2">
          <Input
            type="text"
            value={fallbackInput}
            onChange={(e) => setFallbackInput(e.target.value)}
            placeholder="e.g., 'Tell me about the sprint'"
            className="bg-background/50 border-primary/30 text-base"
          />
          <Button type="submit" variant="outline" size="icon" className="border-primary text-primary hover:bg-primary/10">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="text-center mb-8 flex flex-col items-center gap-4">
      <Button
        size="lg"
        variant="outline"
        onClick={handleToggleConversation}
        className={`rounded-full w-32 h-32 border-4 transition-all duration-300 relative overflow-hidden cursor-pointer ${
          conversation.status === 'connected'
            ? 'border-destructive text-destructive animate-subtle-pulse bg-destructive/10 hover:bg-destructive/20'
            : 'border-primary text-primary hover:bg-primary/10 magic-circle animate-glow hover:scale-110'
        }`}
        aria-label={conversation.status === 'connected' ? 'Stop conversation' : 'Start conversation'}
      >
        {conversation.status === 'connected' ? <MicOff size={48} className="!w-12 !h-12" /> : <Mic size={48} className="!w-12 !h-12" />}
      </Button>
      <div className="text-center">
        <p className="text-lg text-muted-foreground font-medium">{getStatusLabel()}</p>
        <p className="text-sm text-muted-foreground/80 mt-1">Ask about our programs</p>
      </div>
    </div>
  );
};

export default AIAgent;
