
import React from 'react';
import { useQuestProgress } from '@/context/QuestProgressContext';
import { Progress } from '@/components/ui/progress';
import { useAudio } from '@/context/AudioContext';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

const QuestProgressBar = () => {
  const { progress, questTitle } = useQuestProgress();
  const { isMuted, toggleMute } = useAudio();

  return (
    <div className="sticky bottom-0 z-30 w-full p-4 bg-background/70 backdrop-blur-md">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Spacer - balances the button on the right */}
        <div className="w-10 h-10" />

        {/* Centered Progress Bar */}
        <div className="flex-1 px-4">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-2">
              <p className="text-sm font-semibold text-primary tracking-wider uppercase">{questTitle}</p>
              <p className="text-xs text-muted-foreground">Your Quest Progress: {Math.round(progress)}%</p>
            </div>
            <div className="relative p-1 rounded-full quest-progress-bar-container">
              <Progress value={progress} className="h-3 quest-progress-bar" />
            </div>
          </div>
        </div>

        {/* Right Mute Button */}
        <div className="flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="text-white hover:bg-white/10 hover:text-white"
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestProgressBar;
