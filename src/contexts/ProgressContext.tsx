import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

export interface SimulationResult {
  simulationId: string;
  score: number;
  totalQuestions: number;
  completedAt: Date;
  timeSpent: number;
  attempts: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: 'simulation' | 'learning' | 'streak' | 'mastery';
}

export interface UserProgress {
  totalSimulationsCompleted: number;
  averageScore: number;
  timeSpent: number;
  currentStreak: number;
  longestStreak: number;
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  completedSections: string[];
  simulationResults: SimulationResult[];
  achievements: Achievement[];
  lastActiveDate: Date;
}

interface ProgressContextType {
  progress: UserProgress;
  updateSimulationResult: (result: SimulationResult) => void;
  markSectionCompleted: (sectionId: string) => void;
  getRecommendations: () => string[];
  calculateSkillLevel: () => 'beginner' | 'intermediate' | 'advanced' | 'expert';
  checkForNewAchievements: () => Achievement[];
  loading: boolean;
}

const defaultProgress: UserProgress = {
  totalSimulationsCompleted: 0,
  averageScore: 0,
  timeSpent: 0,
  currentStreak: 0,
  longestStreak: 0,
  skillLevel: 'beginner',
  completedSections: [],
  simulationResults: [],
  achievements: [],
  lastActiveDate: new Date()
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Load progress from localStorage
  useEffect(() => {
    if (currentUser) {
      const savedProgress = localStorage.getItem(`progress_${currentUser.uid}`);
      if (savedProgress) {
        const parsedProgress = JSON.parse(savedProgress);
        // Convert date strings back to Date objects
        parsedProgress.lastActiveDate = new Date(parsedProgress.lastActiveDate);
        parsedProgress.simulationResults = parsedProgress.simulationResults.map((result: any) => ({
          ...result,
          completedAt: new Date(result.completedAt)
        }));
        parsedProgress.achievements = parsedProgress.achievements.map((achievement: any) => ({
          ...achievement,
          unlockedAt: new Date(achievement.unlockedAt)
        }));
        setProgress(parsedProgress);
      }
    } else {
      setProgress(defaultProgress);
    }
    setLoading(false);
  }, [currentUser]);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (currentUser && !loading) {
      localStorage.setItem(`progress_${currentUser.uid}`, JSON.stringify(progress));
    }
  }, [progress, currentUser, loading]);

  const updateSimulationResult = (result: SimulationResult) => {
    setProgress(prev => {
      const existingResults = prev.simulationResults.filter(r => r.simulationId !== result.simulationId);
      const newResults = [...existingResults, result];
      
      const totalCompleted = newResults.length;
      const averageScore = newResults.reduce((sum, r) => sum + (r.score / r.totalQuestions), 0) / totalCompleted * 100;
      const totalTimeSpent = prev.timeSpent + result.timeSpent;
      
      // Update streak
      const today = new Date().toDateString();
      const lastActive = prev.lastActiveDate.toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      
      let newStreak = prev.currentStreak;
      if (lastActive === today) {
        // Same day, keep streak
        newStreak = prev.currentStreak;
      } else if (lastActive === yesterday) {
        // Consecutive day, increment streak
        newStreak = prev.currentStreak + 1;
      } else {
        // Streak broken, reset to 1
        newStreak = 1;
      }

      const newProgress = {
        ...prev,
        totalSimulationsCompleted: totalCompleted,
        averageScore: Math.round(averageScore),
        timeSpent: totalTimeSpent,
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        simulationResults: newResults,
        lastActiveDate: new Date(),
        skillLevel: calculateSkillLevelFromProgress(totalCompleted, averageScore)
      };

      return newProgress;
    });
  };

  const markSectionCompleted = (sectionId: string) => {
    setProgress(prev => ({
      ...prev,
      completedSections: [...new Set([...prev.completedSections, sectionId])],
      lastActiveDate: new Date()
    }));
  };

  const calculateSkillLevel = (): 'beginner' | 'intermediate' | 'advanced' | 'expert' => {
    return calculateSkillLevelFromProgress(progress.totalSimulationsCompleted, progress.averageScore);
  };

  const calculateSkillLevelFromProgress = (completed: number, avgScore: number): 'beginner' | 'intermediate' | 'advanced' | 'expert' => {
    if (completed >= 15 && avgScore >= 90) return 'expert';
    if (completed >= 10 && avgScore >= 80) return 'advanced';
    if (completed >= 5 && avgScore >= 70) return 'intermediate';
    return 'beginner';
  };

  const getRecommendations = (): string[] => {
    const { skillLevel, completedSections, simulationResults } = progress;
    const recommendations: string[] = [];

    // Based on skill level
    if (skillLevel === 'beginner') {
      recommendations.push('Start with basic phishing detection simulation');
      recommendations.push('Learn about password security fundamentals');
    } else if (skillLevel === 'intermediate') {
      recommendations.push('Try advanced social engineering scenarios');
      recommendations.push('Explore network security simulations');
    } else if (skillLevel === 'advanced') {
      recommendations.push('Master complex threat analysis');
      recommendations.push('Practice incident response procedures');
    }

    // Based on weak areas
    const phishingResults = simulationResults.filter(r => r.simulationId === 'phishing-email');
    if (phishingResults.length > 0 && phishingResults[phishingResults.length - 1].score < 3) {
      recommendations.push('Review phishing detection techniques');
    }

    const wifiResults = simulationResults.filter(r => r.simulationId === 'wifi-security');
    if (wifiResults.length > 0 && wifiResults[wifiResults.length - 1].score < 4) {
      recommendations.push('Study public Wi-Fi security best practices');
    }

    // Based on incomplete sections
    if (!completedSections.includes('threats')) {
      recommendations.push('Complete the Cyber Threats learning section');
    }
    if (!completedSections.includes('laws')) {
      recommendations.push('Learn about cyber laws and compliance');
    }
    if (!completedSections.includes('prevention')) {
      recommendations.push('Master prevention strategies');
    }

    return recommendations.slice(0, 3); // Return top 3 recommendations
  };

  const checkForNewAchievements = (): Achievement[] => {
    const newAchievements: Achievement[] = [];
    const existingAchievementIds = progress.achievements.map(a => a.id);

    // First simulation completed
    if (progress.totalSimulationsCompleted >= 1 && !existingAchievementIds.includes('first-simulation')) {
      newAchievements.push({
        id: 'first-simulation',
        title: 'First Steps',
        description: 'Completed your first simulation',
        icon: 'play',
        unlockedAt: new Date(),
        category: 'simulation'
      });
    }

    // Perfect score achievement
    const perfectScores = progress.simulationResults.filter(r => r.score === r.totalQuestions);
    if (perfectScores.length >= 1 && !existingAchievementIds.includes('perfect-score')) {
      newAchievements.push({
        id: 'perfect-score',
        title: 'Perfectionist',
        description: 'Achieved a perfect score in a simulation',
        icon: 'star',
        unlockedAt: new Date(),
        category: 'simulation'
      });
    }

    // Streak achievements
    if (progress.currentStreak >= 3 && !existingAchievementIds.includes('streak-3')) {
      newAchievements.push({
        id: 'streak-3',
        title: 'On Fire',
        description: 'Maintained a 3-day learning streak',
        icon: 'flame',
        unlockedAt: new Date(),
        category: 'streak'
      });
    }

    if (progress.currentStreak >= 7 && !existingAchievementIds.includes('streak-7')) {
      newAchievements.push({
        id: 'streak-7',
        title: 'Dedicated Learner',
        description: 'Maintained a 7-day learning streak',
        icon: 'calendar',
        unlockedAt: new Date(),
        category: 'streak'
      });
    }

    // Simulation mastery
    if (progress.totalSimulationsCompleted >= 5 && !existingAchievementIds.includes('simulation-master')) {
      newAchievements.push({
        id: 'simulation-master',
        title: 'Simulation Master',
        description: 'Completed 5 different simulations',
        icon: 'trophy',
        unlockedAt: new Date(),
        category: 'simulation'
      });
    }

    // High average score
    if (progress.averageScore >= 85 && progress.totalSimulationsCompleted >= 3 && !existingAchievementIds.includes('high-achiever')) {
      newAchievements.push({
        id: 'high-achiever',
        title: 'High Achiever',
        description: 'Maintained 85%+ average score',
        icon: 'award',
        unlockedAt: new Date(),
        category: 'mastery'
      });
    }

    // Skill level achievements
    if (progress.skillLevel === 'intermediate' && !existingAchievementIds.includes('intermediate-level')) {
      newAchievements.push({
        id: 'intermediate-level',
        title: 'Rising Guardian',
        description: 'Reached intermediate skill level',
        icon: 'shield',
        unlockedAt: new Date(),
        category: 'mastery'
      });
    }

    if (progress.skillLevel === 'advanced' && !existingAchievementIds.includes('advanced-level')) {
      newAchievements.push({
        id: 'advanced-level',
        title: 'Cyber Defender',
        description: 'Reached advanced skill level',
        icon: 'shield-check',
        unlockedAt: new Date(),
        category: 'mastery'
      });
    }

    if (progress.skillLevel === 'expert' && !existingAchievementIds.includes('expert-level')) {
      newAchievements.push({
        id: 'expert-level',
        title: 'Cyber Sentinel',
        description: 'Reached expert skill level',
        icon: 'crown',
        unlockedAt: new Date(),
        category: 'mastery'
      });
    }

    // Update progress with new achievements
    if (newAchievements.length > 0) {
      setProgress(prev => ({
        ...prev,
        achievements: [...prev.achievements, ...newAchievements]
      }));
    }

    return newAchievements;
  };

  const value = {
    progress,
    updateSimulationResult,
    markSectionCompleted,
    getRecommendations,
    calculateSkillLevel,
    checkForNewAchievements,
    loading
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};