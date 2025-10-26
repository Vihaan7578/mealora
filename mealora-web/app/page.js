'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { FiZap, FiHeart, FiTrendingUp, FiUsers, FiCheckCircle } from 'react-icons/fi'
import { GiMeal, GiShoppingCart, GiHealthNormal } from 'react-icons/gi'

export default function Home() {
  const router = useRouter()

  const features = [
    {
      icon: <FiZap className="w-8 h-8" />,
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
          className="absolute top-20 left-10 w-72 h-72 bg-primary-300/30 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-300/30 rounded-full blur-3xl"
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
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl"
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
              className="inline-block mb-6"
            >
              <div className="flex items-center justify-center gap-3 px-8 py-3 glass rounded-full shadow-glow">
                <span className="text-5xl">🌿</span>
                <h1 className="text-6xl font-black gradient-text">
                  Mealora
                </h1>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto"
            >
              Your AI Nutritionist for{' '}
              <span className="gradient-text">Beautiful Meal Plans</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
            >
              Transform your health with personalized vegetarian meal plans 
              powered by cutting-edge AI technology
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(99, 102, 241, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/planner')}
                className="group relative px-10 py-5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-lg font-bold rounded-2xl shadow-glow overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FiZap className="w-6 h-6" />
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
                className="px-10 py-5 glass text-gray-900 text-lg font-bold rounded-2xl hover:shadow-lg transition-all"
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
            className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="glass p-6 rounded-2xl text-center group hover:shadow-glow transition-all"
              >
                <div className="flex justify-center mb-3 text-primary-500 text-3xl">
                  {stat.icon}
                </div>
                <div className="text-4xl font-black gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-4 gradient-text">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for perfect meal planning
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass p-8 rounded-3xl group hover:shadow-glow-lg transition-all cursor-pointer"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-lg">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-4 gradient-text">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to your perfect meal plan
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
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
                <div className="text-8xl mb-4">{item.icon}</div>
                <div className="text-6xl font-black text-primary-200 mb-4">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-lg">
                  {item.desc}
                </p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/3 -right-4 text-4xl text-primary-300">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto glass-dark p-12 rounded-3xl text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20" />
          <div className="relative z-10">
            <h2 className="text-5xl font-black mb-6 text-gray-900">
              Ready to Transform Your Health?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Join thousands of people who have already started their journey to better health
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/planner')}
              className="px-12 py-6 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xl font-bold rounded-2xl shadow-glow-lg"
            >
              Get Your Free Meal Plan
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 text-center text-gray-600">
        <p className="text-lg">
          Made with <span className="text-red-500">♥</span> using Next.js, React, Tailwind CSS & Google Gemini AI
        </p>
        <p className="mt-2">© 2025 Mealora. All rights reserved.</p>
      </footer>
    </div>
  )
}

