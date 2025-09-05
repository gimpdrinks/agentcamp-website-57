
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';

const QUEST_POINTS = {
  INTERACT_AI: 20,
  VIEW_TESTIMONIALS: 20,
  VIEW_FEATURES: 20,
  VIEW_FAQ: 20,
  VIEW_CTA: 20,
  SUBMIT_FINAL_CTA: 40,
};

const MAX_PROGRESS = 160; // Updated to match actual achievable points

type QuestAction = keyof typeof QUEST_POINTS;

type QuestProgressContextType = {
  progress: number;
  addProgress: (action: QuestAction) => void;
  questTitle: string;
};

const QuestProgressContext = createContext<QuestProgressContextType | undefined>(undefined);

const QUEST_STORAGE_KEY = 'agentCampQuestProgress';

type StoredState = {
    points: number;
    actions: QuestAction[];
}

const getInitialState = (): StoredState => {
    if (typeof window === 'undefined') {
        return { points: 0, actions: [] };
    }
    try {
        const storedState = window.localStorage.getItem(QUEST_STORAGE_KEY);
        if (storedState) {
            const parsedState = JSON.parse(storedState) as StoredState;
            if (typeof parsedState.points === 'number' && Array.isArray(parsedState.actions)) {
                return parsedState;
            }
        }
    } catch (e) {
        console.error("Failed to parse quest progress from localStorage", e);
    }
    return { points: 0, actions: [] };
}

export const QuestProgressProvider = ({ children }: { children: ReactNode }) => {
  const [currentPoints, setCurrentPoints] = useState(() => getInitialState().points);
  const [completedActions, setCompletedActions] = useState<Set<QuestAction>>(() => new Set(getInitialState().actions));

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
          const state: StoredState = {
              points: currentPoints,
              actions: Array.from(completedActions)
          };
          window.localStorage.setItem(QUEST_STORAGE_KEY, JSON.stringify(state));
      } catch (e) {
          console.error("Failed to save quest progress to localStorage", e);
      }
    }
  }, [currentPoints, completedActions]);

  const addProgress = useCallback((action: QuestAction) => {
    console.log('Adding progress for action:', action, {
      alreadyCompleted: completedActions.has(action),
      currentPoints,
      maxProgress: MAX_PROGRESS
    });

    if (completedActions.has(action)) {
      console.log('Action already completed, skipping');
      return;
    }

    if (currentPoints >= MAX_PROGRESS) {
      console.log('Max progress reached, skipping');
      return;
    }

    const newPoints = currentPoints + QUEST_POINTS[action];
    const newCompletedActions = new Set(completedActions);
    newCompletedActions.add(action);

    console.log('Updating progress:', {
      oldPoints: currentPoints,
      newPoints: Math.min(newPoints, MAX_PROGRESS),
      action,
      pointsForAction: QUEST_POINTS[action]
    });

    setCurrentPoints(Math.min(newPoints, MAX_PROGRESS));
    setCompletedActions(newCompletedActions);
  }, [currentPoints, completedActions]);

  const progress = currentPoints > 0 ? Math.min((currentPoints / MAX_PROGRESS) * 100, 100) : 0;

  const getQuestTitle = () => {
    if (progress >= 100) return "Quest Complete: Master Agent!";
    if (progress >= 75) return "Almost There: Agent Extraordinaire";
    if (progress >= 50) return "Halfway: Promising Recruit";
    if (progress >= 25) return "Getting Started: Curious Explorer";
    return "The Journey Begins";
  };

  const value = {
    progress: isNaN(progress) ? 0 : progress,
    addProgress,
    questTitle: getQuestTitle(),
  };

  console.log('Quest Progress Context Value:', value);

  return (
    <QuestProgressContext.Provider value={value}>
      {children}
    </QuestProgressContext.Provider>
  );
};

export const useQuestProgress = () => {
  const context = useContext(QuestProgressContext);
  if (context === undefined) {
    throw new Error('useQuestProgress must be used within a QuestProgressProvider');
  }
  return context;
};
