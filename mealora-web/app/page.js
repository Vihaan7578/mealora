'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { FiZap, FiHeart, FiTrendingUp, FiUsers, FiCheckCircle } from 'react-icons/fi'
import { GiMeal, GiShoppingCart, GiHealthNormal } from 'react-icons/gi'
import { useDeviceDetection } from '@/hooks/useDeviceDetection'
import ResponsiveContainer from '@/components/ResponsiveContainer'
import ResponsiveText from '@/components/ResponsiveText'
import ResponsiveGrid from '@/components/ResponsiveGrid'
import ResponsiveButton from '@/components/ResponsiveButton'

export default function Home() {
  const router = useRouter()
  const deviceInfo = useDeviceDetection()

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
      <section className="relative" style={{ 
        paddingTop: deviceInfo.isMobile ? '60px' : '80px',
        paddingBottom: deviceInfo.isMobile ? '80px' : '120px'
      }}>
        <ResponsiveContainer>
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
              className="inline-block"
              style={{ marginBottom: deviceInfo.isMobile ? '24px' : '32px' }}
            >
              <div 
                className="flex items-center justify-center glass rounded-full shadow-glow"
                style={{
                  gap: deviceInfo.isMobile ? '8px' : '12px',
                  padding: deviceInfo.isMobile ? '12px 24px' : '16px 32px'
                }}
              >
                <span style={{ fontSize: deviceInfo.isMobile ? '24px' : '32px' }}>🌿</span>
                <ResponsiveText size="4xl" weight="black" className="gradient-text">
                  Mealora
                </ResponsiveText>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{ marginBottom: deviceInfo.isMobile ? '24px' : '32px' }}
            >
              <ResponsiveText size="3xl" weight="bold" color="gray-900" className="gradient-text">
                Your AI Nutritionist for{' '}
                <span className="gradient-text">Beautiful Meal Plans</span>
              </ResponsiveText>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{ marginBottom: deviceInfo.isMobile ? '32px' : '48px' }}
            >
              <ResponsiveText size="lg" color="gray-600">
                Transform your health with personalized vegetarian meal plans 
                powered by cutting-edge AI technology
              </ResponsiveText>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex justify-center items-center"
              style={{
                flexDirection: deviceInfo.isMobile ? 'column' : 'row',
                gap: deviceInfo.isMobile ? '12px' : '16px'
              }}
            >
              <ResponsiveButton
                variant="primary"
                onClick={() => router.push('/planner')}
                fullWidth={deviceInfo.isMobile}
                className="group relative overflow-hidden"
              >
                <FiZap style={{ 
                  width: deviceInfo.isMobile ? '16px' : '20px', 
                  height: deviceInfo.isMobile ? '16px' : '20px' 
                }} />
                Start Planning Now
              </ResponsiveButton>

              <ResponsiveButton
                variant="secondary"
                fullWidth={deviceInfo.isMobile}
              >
                Watch Demo
              </ResponsiveButton>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            style={{ marginTop: deviceInfo.isMobile ? '48px' : '64px' }}
          >
            <ResponsiveGrid 
              columns={deviceInfo.isMobile ? 2 : 4}
              gap={deviceInfo.isMobile ? 12 : 20}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="glass text-center group hover:shadow-glow transition-all"
                  style={{
                    padding: deviceInfo.isMobile ? '16px' : '24px',
                    borderRadius: deviceInfo.isMobile ? '12px' : '16px'
                  }}
                >
                  <div 
                    className="flex justify-center text-primary-500"
                    style={{
                      marginBottom: deviceInfo.isMobile ? '8px' : '12px',
                      fontSize: deviceInfo.isMobile ? '20px' : '24px'
                    }}
                  >
                    {stat.icon}
                  </div>
                  <ResponsiveText 
                    size="2xl" 
                    weight="black" 
                    className="gradient-text"
                    style={{ marginBottom: deviceInfo.isMobile ? '4px' : '8px' }}
                  >
                    {stat.number}
                  </ResponsiveText>
                  <ResponsiveText size="sm" color="gray-600" weight="medium">
                    {stat.label}
                  </ResponsiveText>
                </motion.div>
              ))}
            </ResponsiveGrid>
          </motion.div>
        </ResponsiveContainer>
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

