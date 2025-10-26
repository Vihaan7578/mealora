'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

export default function MealPlanDisplay({ plan }) {
  const [expandedDays, setExpandedDays] = useState([0])

  const toggleDay = (index) => {
    setExpandedDays(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  // Parse the meal plan into sections
  const sections = plan.split(/DAY \d+/i).filter(Boolean)
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6 max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] overflow-y-auto pr-2 custom-scrollbar"
    >
      {/* Success Header */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl text-center"
      >
        <div className="text-2xl sm:text-3xl lg:text-4xl mb-2">✅</div>
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">Your Meal Plan is Ready!</h3>
        <p className="text-green-100 mt-1 text-sm sm:text-base">Scroll down to see your 7-day plan</p>
      </motion.div>

      {/* Meal Plan Content */}
      <div className="bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <div className="prose max-w-none">
          {/* Display raw plan with better formatting */}
          <div className="space-y-3 sm:space-y-4">
            {sections.length > 1 ? (
              // If we successfully parsed days
              sections.slice(1).map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-2 border-gray-200 rounded-lg sm:rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleDay(index)}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-primary-50 to-secondary-50 hover:from-primary-100 hover:to-secondary-100 transition-all flex items-center justify-between touch-friendly"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-lg sm:text-xl lg:text-2xl font-bold text-primary-600">
                        Day {index + 1}
                      </span>
                      <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-700">
                        {days[index]}
                      </span>
                    </div>
                    {expandedDays.includes(index) ? (
                      <FiChevronUp className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-600" />
                    ) : (
                      <FiChevronDown className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-600" />
                    )}
                  </button>
                  
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedDays.includes(index) ? 'auto' : 0,
                      opacity: expandedDays.includes(index) ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 sm:p-6 bg-white">
                      <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-gray-800 leading-relaxed">
                        {section.trim()}
                      </pre>
                    </div>
                  </motion.div>
                </motion.div>
              ))
            ) : (
              // Fallback: display full plan
              <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-gray-800 leading-relaxed">
                {plan}
              </pre>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {[
          { label: '7 Days', icon: '📅', color: 'from-blue-500 to-blue-600' },
          { label: '21 Meals', icon: '🍽️', color: 'from-green-500 to-green-600' },
          { label: '100% Veggie', icon: '🌱', color: 'from-emerald-500 to-emerald-600' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className={`bg-gradient-to-r ${stat.color} text-white p-3 sm:p-4 rounded-lg sm:rounded-xl text-center`}
          >
            <div className="text-xl sm:text-2xl lg:text-3xl mb-1">{stat.icon}</div>
            <div className="font-bold text-xs sm:text-sm lg:text-base">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

