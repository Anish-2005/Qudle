'use client';
import { motion } from 'framer-motion';
import { Trophy, Sparkles, School, Users, BarChart, Puzzle, Flame, Zap, Clock, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const features = [
    { icon: Sparkles, title: "AI-Powered Quizzes", desc: "Dynamic question generation with adaptive difficulty scaling" },
    { icon: Trophy, title: "Battle Royale Mode", desc: "Compete in real-time quiz battles with classmates" },
    { icon: Puzzle, title: "Skill Recovery Games", desc: "Mistake jailbreak puzzles to reinforce learning" },
    { icon: Users, title: "Classroom Wars", desc: "Team-based competitions with shared leaderboards" },
    { icon: BarChart, title: "Progress Analytics", desc: "Detailed performance tracking & skill mapping" },
    { icon: School, title: "Achievement System", desc: "Unlock badges, trophies, and MVP titles" },
  ];

  const leaderboard = [
    { name: "Sarah Johnson", points: 2450, streak: 27 },
    { name: "Alex Martinez", points: 1985, streak: 35 },
    { name: "Priya Sharma", points: 1820, streak: 19 },
  ];

  const stats = [
    { value: "50K+", label: "Active Students" },
    { value: "1M+", label: "Quizzes Taken" },
    { value: "95%", label: "Engagement Rate" },
    { value: "4.9/5", label: "Student Rating" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navigation Header */}
      <nav className="sticky top-0 bg-gray-900/80 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <Trophy className="w-8 h-8 text-emerald-400" />
            <span className="text-xl font-bold">QUDLE</span>
          </motion.div>
          <Link href="/trophy">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 border border-emerald-500/30"
            >
              <Trophy className="w-5 h-5" />
              View Achievements
            </motion.button>
          </Link>
        </div>
      </nav>

     {/* Hero Section */}
<motion.section 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="relative py-20 text-center overflow-hidden z-0"
>
  {/* Background Gradient */}
  <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent z-0" />

  {/* Foreground Content */}
  <div className="relative z-10 max-w-6xl mx-auto px-4">
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="inline-block mb-8"
    >
      <span className="text-xs font-bold tracking-wide bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full">
        The learning game
      </span>
    </motion.div>

    <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
      <span className="glow">QUDLE</span>
    </h1>

    <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
      Revolutionize learning through competitive gameplay, AI-driven challenges, and skill-based progression
    </p>

    <div className="flex justify-center gap-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold transition-all"
      >
        Join Classroom Battle
      </motion.button>

      <Link href="/trophy">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="border border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 px-8 py-4 rounded-lg font-semibold"
        >
          View Trophy Room
        </motion.button>
      </Link>
    </div>
  </div>
</motion.section>


      {/* Stats Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50"
            >
              <div className="text-3xl font-bold text-emerald-400 mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Game-Changing Features</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Discover the powerful tools that make learning addictive and effective
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-emerald-500/30 transition-all group"
              >
                <div className="mb-4">
                  <feature.icon className="w-12 h-12 text-emerald-400 transition-transform group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Leaderboard */}
      <section className="py-20">
  <div className="max-w-4xl mx-auto px-4">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="mb-12 text-center"
    >
      <h2 className="text-3xl font-bold mb-4">Live Leaderboard</h2>
      <p className="text-gray-400">Top performers of the week</p>
    </motion.div>
    
    <div className="space-y-6">
      {leaderboard.map((user, index) => {
        // Create deterministic progress based on index
        const progress = 70 - (index * 15); // 70%, 55%, 40%
        const dashValue = (progress / 100) * 283;
        
        return (
          <motion.div
            key={user.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-emerald-500/30 transition-all"
          >
            <span className="text-2xl font-bold w-12">
              {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
            </span>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <div className="flex items-center gap-4 text-gray-400">
                <div className="flex items-center gap-1">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span>{user.streak} Day Streak</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span>{user.points} XP</span>
                </div>
              </div>
            </div>
            <div className="w-20 h-20">
              <svg className="w-full h-full transform -rotate-90">
                <circle 
                  cx="50%" 
                  cy="50%" 
                  r="45%" 
                  className="stroke-gray-700" 
                  strokeWidth="10%" 
                  fill="none" 
                />
                <circle 
                  cx="50%" 
                  cy="50%" 
                  r="45%" 
                  className="stroke-emerald-500" 
                  strokeWidth="10%" 
                  fill="none"
                  strokeDasharray={`${dashValue} 283`}
                />
              </svg>
            </div>
          </motion.div>
        )
      })}
    </div>
  </div>
</section>

     {/* CTA Section */}
{/* CTA Section */}
<motion.section
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  className="py-20 text-center"
>
  <div className="max-w-4xl mx-auto px-4">
    <div className="bg-gray-800/50 p-12 rounded-3xl border border-gray-700/50 relative overflow-hidden">
      {/* Gradient overlay with z-index below content */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-purple-500/10 opacity-30 z-[1]" />

      {/* Content with higher z-index */}
      <div className="relative z-[2]">
        <h2 className="text-3xl font-bold mb-6">Ready to Transform Learning?</h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          Join thousands of students mastering subjects through competitive gameplay
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          {/* Start Free Trial Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold relative z-[3]"
          >
            Start Free Trial
          </motion.button>

          {/* Achievements Link */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-[3]"
          >
            <Link
              href="/trophy"
              className="inline-block w-full border border-purple-500 text-purple-400 hover:bg-purple-500/10 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold transition-colors duration-200"
            >
              See Achievements
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  </div>
</motion.section>
    </div>
  );
}