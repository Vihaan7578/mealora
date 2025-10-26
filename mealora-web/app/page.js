'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { FiSparkles, FiHeart, FiTrendingUp, FiUsers, FiCheckCircle } from 'react-icons/fi'
import { GiMeal, GiShoppingCart, GiHealthNormal } from 'react-icons/gi'

export default function Home() {
  const router = useRouter()

  const features = [
    {
      icon: <FiSparkles className="w-8 h-8" />,
      title: 'AI-Powered',
      description: 'Google Gemini AI creates personalized meal plans just for you',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <GiMeal className="w-8 h-8" />,
      title: '7-Day Plans',
      description: 'Complete weekly meal plans with breakfast, lunch, dinner & snacks',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: <GiHealthNormal className="w-8 h-8" />,
      title: 'Nutrition Focused',
      description: 'Calorie tracking, macro balance, and health goal optimization',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <GiShoppingCart className="w-8 h-8" />,
      title: 'Smart Grocery Lists',
      description: 'Auto-generated shopping lists organized by category',
      color: 'from-blue-500 to-indigo-500'
    }
  ]

  const stats = [
    { number: '100%', label: 'Vegetarian', icon: <FiHeart /> },
    { number: '10K+', label: 'Happy Users', icon: <FiUsers /> },
    { number: '50K+', label: 'Meals Planned', icon: <GiMeal /> },
    { number: '4.9★', label: 'User Rating', icon: <FiCheckCircle /> }
  ]

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-4 sm:left-10 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-primary-300/30 rounded-full blur-3xl background-animations gpu-accelerated"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-4 sm:right-10 w-40 h-40 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-secondary-300/30 rounded-full blur-3xl background-animations gpu-accelerated"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-purple-300/20 rounded-full blur-3xl background-animations gpu-accelerated"
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Logo/Title */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4 sm:mb-6"
            >
              <div className="flex items-center justify-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-3 glass rounded-full shadow-glow">
                <span className="text-3xl sm:text-4xl md:text-5xl">🌿</span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black gradient-text">
                  Mealora
                </h1>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 max-w-4xl mx-auto px-4"
            >
              Your AI Nutritionist for{' '}
              <span className="gradient-text">Beautiful Meal Plans</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto px-4"
            >
              Transform your health with personalized vegetarian meal plans 
              powered by cutting-edge AI technology
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(99, 102, 241, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/planner')}
                className="group relative px-6 py-4 sm:px-8 sm:py-4 md:px-10 md:py-5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-base sm:text-lg md:text-xl font-bold rounded-2xl shadow-glow overflow-hidden min-h-[44px] w-full sm:w-auto focus-visible"
                aria-label="Start creating your personalized meal plan"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <FiSparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                  Start Planning Now
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-secondary-500 to-primary-500"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-4 sm:px-8 sm:py-4 md:px-10 md:py-5 glass text-gray-900 text-base sm:text-lg md:text-xl font-bold rounded-2xl hover:shadow-lg transition-all min-h-[44px] w-full sm:w-auto focus-visible"
                aria-label="Watch a demo of the meal planning process"
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-16 sm:mt-20 md:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="glass p-4 sm:p-6 rounded-2xl text-center group hover:shadow-glow transition-all"
              >
                <div className="flex justify-center mb-2 sm:mb-3 text-primary-500 text-2xl sm:text-3xl">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-black gradient-text mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 gradient-text">
              Powerful Features
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Everything you need for perfect meal planning
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass p-6 sm:p-8 rounded-3xl group hover:shadow-glow-lg transition-all cursor-pointer"
              >
                <div className={`inline-flex p-3 sm:p-4 rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 gradient-text">
              How It Works
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Three simple steps to your perfect meal plan
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {[
              { step: '01', title: 'Tell Us About You', desc: 'Share your age, goals, and food preferences', icon: '👤' },
              { step: '02', title: 'AI Creates Your Plan', desc: 'Our AI analyzes and generates your perfect plan', icon: '🤖' },
              { step: '03', title: 'Start Your Journey', desc: 'Get recipes, grocery lists, and track progress', icon: '🚀' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center relative"
              >
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl mb-3 sm:mb-4">{item.icon}</div>
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary-200 mb-3 sm:mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-600">
                  {item.desc}
                </p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/3 -right-4 text-2xl sm:text-3xl md:text-4xl text-primary-300">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto glass-dark p-6 sm:p-8 md:p-12 rounded-3xl text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20" />
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 text-gray-900">
              Ready to Transform Your Health?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join thousands of people who have already started their journey to better health
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/planner')}
              className="px-6 py-4 sm:px-8 sm:py-5 md:px-12 md:py-6 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-base sm:text-lg md:text-xl font-bold rounded-2xl shadow-glow-lg min-h-[44px] w-full sm:w-auto"
            >
              Get Your Free Meal Plan
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-10 md:py-12 px-4 text-center text-gray-600">
        <p className="text-sm sm:text-base md:text-lg">
          Made with <span className="text-red-500">♥</span> using Next.js, React, Tailwind CSS & Google Gemini AI
        </p>
        <p className="mt-2 text-xs sm:text-sm md:text-base">© 2025 Mealora. All rights reserved.</p>
      </footer>
    </div>
  )
}

