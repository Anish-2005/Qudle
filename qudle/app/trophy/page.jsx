'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Lock, Sparkles, Flame, Users, Sword, Brain, RotateCcw, Share2, Gift, AlarmClock, Zap, Clock, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';

// Initial States
const initialProgressState = {
  quizzesCompleted: 0,
  loginStreak: 0,
  battleRoyaleWins: 0,
  classroomWins: 0,
  powerUses: 0,
  perfectScores: 0,
  dailyChallengesCompleted: 0,
  comboMultiplier: 1,
  timeLimitedCompleted: 0,
  totalXP: 0
};

const initialTrophies = [
  {
    id: 1,
    title: "Rookie Scholar",
    description: "Complete first quiz",
    icon: <BookOpen className="w-8 h-8" />,
    condition: (p) => p.quizzesCompleted >= 1,
    rarity: 'Common',
    xp: 100,
    progress: 0
  },
  {
    id: 2,
    title: "Streak Surgeon",
    description: "7-day login streak",
    icon: <Flame className="w-8 h-8" />,
    condition: (p) => p.loginStreak >= 7,
    rarity: 'Rare',
    xp: 250,
    progress: 0
  },
  {
    id: 3,
    title: "Battle Champion",
    description: "Win 5 Battle Royale matches",
    icon: <Sword className="w-8 h-8" />,
    condition: (p) => p.battleRoyaleWins >= 5,
    rarity: 'Epic',
    xp: 500,
    progress: 0
  },
  {
    id: 4,
    title: "Classroom Conqueror",
    description: "Win 3 Classroom battles",
    icon: <Users className="w-8 h-8" />,
    condition: (p) => p.classroomWins >= 3,
    rarity: 'Epic',
    xp: 750,
    progress: 0
  },
  {
    id: 5,
    title: "Power Master",
    description: "Use 10 power-ups",
    icon: <Zap className="w-8 h-8" />,
    condition: (p) => p.powerUses >= 10,
    rarity: 'Rare',
    xp: 300,
    progress: 0
  },
  {
    id: 6,
    title: "Perfect Scholar",
    description: "Score 100% in 5 quizzes",
    icon: <Sparkles className="w-8 h-8" />,
    condition: (p) => p.perfectScores >= 5,
    rarity: 'Legendary',
    xp: 1000,
    progress: 0
  },
  {
    id: 7,
    title: "Daily Warrior",
    description: "Complete 3 daily challenges",
    icon: <AlarmClock className="w-8 h-8" />,
    condition: (p) => p.dailyChallengesCompleted >= 3,
    rarity: 'Epic',
    xp: 600,
    progress: 0
  },
  {
    id: 8,
    title: "Time Crusher",
    description: "Complete flash challenge",
    icon: <Clock className="w-8 h-8" />,
    condition: (p) => p.timeLimitedCompleted >= 5,
    rarity: 'Legendary',
    xp: 1500,
    progress: 0
  }
];

const rarityColors = {
  Common: 'text-gray-300',
  Rare: 'text-blue-400',
  Epic: 'text-purple-400',
  Legendary: 'text-orange-400'
};

export default function TrophyPage() {
  const [userProgress, setUserProgress] = useState(initialProgressState);
  const [trophies, setTrophies] = useState(initialTrophies);
  const [timeLimited, setTimeLimited] = useState({
    title: "24hr Flash Challenge",
    description: "Complete 5 quizzes in 24 hours",
    timeLeft: 24 * 60 * 60,
    completed: 0,
    active: true
  });

  // Progress Calculations
  useEffect(() => {
    setTrophies(prev => prev.map(trophy => ({
      ...trophy,
      unlocked: trophy.condition(userProgress),
      progress: calculateProgress(trophy, userProgress)
    })));
  }, [userProgress]);

  const calculateProgress = (trophy, progress) => {
    const conditions = {
      1: progress.quizzesCompleted / 1,
      2: progress.loginStreak / 7,
      3: progress.battleRoyaleWins / 5,
      4: progress.classroomWins / 3,
      5: progress.powerUses / 10,
      6: progress.perfectScores / 5,
      7: progress.dailyChallengesCompleted / 3,
      8: progress.timeLimitedCompleted / 5
    };
    return Math.min(conditions[trophy.id] * 100, 100);
  };

  // Game Actions
  const completeQuiz = (perfect = false) => {
    setUserProgress(prev => ({
      ...prev,
      quizzesCompleted: prev.quizzesCompleted + 1,
      perfectScores: perfect ? prev.perfectScores + 1 : prev.perfectScores,
      timeLimitedCompleted: prev.timeLimitedCompleted + 1,
      totalXP: prev.totalXP + (perfect ? 200 : 100)
    }));
  };

  const winBattle = (type) => {
    setUserProgress(prev => ({
      ...prev,
      [type === 'royale' ? 'battleRoyaleWins' : 'classroomWins']: prev[type === 'royale' ? 'battleRoyaleWins' : 'classroomWins'] + 1,
      totalXP: prev.totalXP + 300
    }));
  };

  const usePowerUp = () => {
    setUserProgress(prev => ({
      ...prev,
      powerUses: prev.powerUses + 1,
      totalXP: prev.totalXP + 50
    }));
  };

  const incrementStreak = () => {
    setUserProgress(prev => ({
      ...prev,
      loginStreak: prev.loginStreak + 1,
      totalXP: prev.totalXP + 100
    }));
  };

  // Time-Limited Challenge
  useEffect(() => {
    if (timeLimited.active) {
      const timer = setInterval(() => {
        setTimeLimited(prev => ({
          ...prev,
          timeLeft: prev.timeLeft > 0 ? prev.timeLeft - 1 : 0,
          active: prev.timeLeft > 0
        }));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLimited.active]);

  // Reset System
  const resetProgress = () => {
    if (confirm('Reset all progress and achievements?')) {
      setUserProgress(initialProgressState);
      setTimeLimited({
        ...timeLimited,
        completed: 0,
        timeLeft: 24 * 60 * 60,
        active: true
      });
    }
  };

  // Achievement Levels
  const getAchievementLevel = (progress) => {
    const levels = [
      { threshold: 0, label: 'Newbie' },
      { threshold: 25, label: 'Beginner' },
      { threshold: 50, label: 'Intermediate' },
      { threshold: 75, label: 'Advanced' },
      { threshold: 95, label: 'Master' }
    ];
    return levels.reverse().find(l => progress >= l.threshold)?.label;
  };

  // Progress Ring Component
  const ProgressRing = ({ progress }) => (
    <div className="relative w-20 h-20">
      <svg className="w-full h-full transform -rotate-90">
        <circle cx="50%" cy="50%" r="45%" className="stroke-gray-700" 
                strokeWidth="10%" fill="none" />
        <circle cx="50%" cy="50%" r="45%" className="stroke-emerald-500"
                strokeWidth="10%" fill="none"
                strokeDasharray={`${(progress / 100) * 283} 283`} />
      </svg>
      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm">
        {Math.round(progress)}%
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="text-center mb-12">
            <div className="inline-block bg-emerald-500/20 p-4 rounded-2xl mb-6">
              <Trophy className="w-12 h-12 text-emerald-400" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Achievement Nexus
            </h1>
            <div className="flex justify-center items-center gap-6">
              <div className="p-4 bg-gray-800/50 rounded-xl">
                <span className="text-emerald-400 font-bold text-2xl">
                  {userProgress.totalXP}
                </span>
                <span className="text-gray-400 ml-2">Total XP</span>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-xl">
                <Flame className="w-6 h-6 text-orange-400 inline-block mr-2" />
                <span className="text-2xl font-bold">{userProgress.loginStreak}</span>
                <span className="text-gray-400 ml-2">Day Streak</span>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Time-Limited Challenge */}
        {timeLimited.active && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-6 bg-purple-500/10 border border-purple-500/30 rounded-2xl"
          >
            <div className="flex items-center gap-6">
              <div className="flex-shrink-0">
                <ProgressRing progress={(timeLimited.completed/5)*100} />
              </div>
              <div className="flex-grow">
                <h2 className="text-2xl font-bold mb-2">{timeLimited.title}</h2>
                <p className="text-gray-300 mb-4">{timeLimited.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-400">
                      Time Remaining: {Math.floor(timeLimited.timeLeft/3600)}h {Math.floor((timeLimited.timeLeft%3600)/60)}m
                    </span>
                  </div>
                  <button
                    onClick={() => completeQuiz()}
                    className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Attempt Quiz (+100 XP)
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Trophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trophies.map(trophy => (
            <motion.div
              key={trophy.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-6 rounded-2xl border-2 transition-all ${
                trophy.unlocked 
                  ? 'border-emerald-500/30 bg-emerald-500/10'
                  : 'border-gray-700/50 bg-gray-800/20'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${
                  trophy.unlocked 
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-gray-700/20 text-gray-500'
                }`}>
                  {trophy.unlocked ? trophy.icon : <Lock className="w-8 h-8" />}
                </div>
                <span className={`text-sm font-bold ${rarityColors[trophy.rarity]}`}>
                  {trophy.rarity}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-2">{trophy.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{trophy.description}</p>

              {!trophy.unlocked ? (
                <div className="space-y-3">
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${trophy.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{getAchievementLevel(trophy.progress)}</span>
                    <span>{trophy.xp} XP</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Sparkles className="w-4 h-4" />
                    <span>Unlocked!</span>
                  </div>
                  <button 
                    onClick={() => navigator.share({
                      title: `I unlocked "${trophy.title}"!`,
                      text: `${trophy.description} - Earned ${trophy.xp} XP`,
                    })}
                    className="text-gray-400 hover:text-emerald-400"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Control Panel */}
        <div className="mt-12 p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50">
          <h3 className="text-xl font-semibold mb-6">Training Simulator</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => completeQuiz(Math.random() > 0.8)}
              className="p-4 bg-emerald-500/20 rounded-lg border border-emerald-500/30 hover:bg-emerald-500/30"
            >
              Complete Quiz
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => winBattle('royale')}
              className="p-4 bg-purple-500/20 rounded-lg border border-purple-500/30 hover:bg-purple-500/30"
            >
              Win Battle Royale
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={usePowerUp}
              className="p-4 bg-blue-500/20 rounded-lg border border-blue-500/30 hover:bg-blue-500/30"
            >
              Use Power-up
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={incrementStreak}
              className="p-4 bg-orange-500/20 rounded-lg border border-orange-500/30 hover:bg-orange-500/30"
            >
              Increment Streak
            </motion.button>
          </div>
          
          <div className="mt-8 flex justify-between items-center">
            <div className="text-gray-400">
              <span className="text-emerald-400">{userProgress.comboMultiplier}x</span> Combo Multiplier
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={resetProgress}
              className="px-6 py-3 bg-red-500/20 text-red-400 rounded-lg border border-red-500/30 hover:bg-red-500/30"
            >
              <RotateCcw className="inline-block w-5 h-5 mr-2" />
              Reset Progress
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}