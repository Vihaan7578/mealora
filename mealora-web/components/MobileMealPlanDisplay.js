'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FiChevronDown, FiChevronUp, FiSave, FiShoppingCart, FiBarChart2, FiDownload } from 'react-icons/fi'
import { useDeviceDetection } from '@/hooks/useDeviceDetection'

export default function MobileMealPlanDisplay({ plan, onSave, onGrocery, onNutrition, onExport }) {
  const [expandedDays, setExpandedDays] = useState([0])
  const deviceInfo = useDeviceDetection()

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

  // Only show mobile layout on mobile devices
  if (!deviceInfo.isMobile) {
    return null
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden mobile-meal-plan">
      {/* Success Header */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl text-center mb-4"
      >
        <div className="text-3xl mb-2">✅</div>
        <h3 className="text-xl font-bold">Your Meal Plan is Ready!</h3>
        <p className="text-green-100 mt-1 text-sm">Scroll down to explore your plan</p>
      </motion.div>

      {/* Card View - Meal Plan Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/50 backdrop-blur-sm rounded-xl p-4 mb-4"
      >
        <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          📋 Meal Plan Overview
        </h4>
        <div className="space-y-3">
          {sections.length > 1 ? (
            sections.slice(1).map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-2 border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleDay(index)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-primary-50 to-secondary-50 hover:from-primary-100 hover:to-secondary-100 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-primary-600">
                      Day {index + 1}
                    </span>
                    <span className="text-base font-semibold text-gray-700">
                      {days[index]}
                    </span>
                  </div>
                  {expandedDays.includes(index) ? (
                    <FiChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <FiChevronDown className="w-5 h-5 text-gray-600" />
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
                  <div className="p-4 bg-white meal-plan-content">
                    <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 leading-relaxed">
                      {section.trim()}
                    </pre>
                  </div>
                </motion.div>
              </motion.div>
            ))
          ) : (
            <div className="meal-plan-content">
              <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 leading-relaxed">
                {plan}
              </pre>
            </div>
          )}
        </div>
      </motion.div>

      {/* Table View - Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/50 backdrop-blur-sm rounded-xl p-4 mb-4"
      >
        <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          📊 Nutrition Summary
        </h4>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: '7 Days', icon: '📅', color: 'from-blue-500 to-blue-600' },
            { label: '21 Meals', icon: '🍽️', color: 'from-green-500 to-green-600' },
            { label: '100% Veggie', icon: '🌱', color: 'from-emerald-500 to-emerald-600' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`bg-gradient-to-r ${stat.color} text-white p-3 rounded-lg text-center`}
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="font-bold text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Exercise Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/50 backdrop-blur-sm rounded-xl p-4 mb-4"
      >
        <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          💪 Exercise Recommendations
        </h4>
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-orange-100 to-red-100 p-3 rounded-lg">
            <h5 className="font-semibold text-gray-900 mb-1">Morning Routine</h5>
            <p className="text-sm text-gray-700">15-20 minutes of light stretching or yoga</p>
          </div>
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-lg">
            <h5 className="font-semibold text-gray-900 mb-1">Cardio</h5>
            <p className="text-sm text-gray-700">30 minutes of walking, cycling, or dancing</p>
          </div>
          <div className="bg-gradient-to-r from-green-100 to-teal-100 p-3 rounded-lg">
            <h5 className="font-semibold text-gray-900 mb-1">Strength Training</h5>
            <p className="text-sm text-gray-700">2-3 times per week with bodyweight exercises</p>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-3"
      >
        <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          🎯 Actions
        </h4>
        
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSave}
            className="flex items-center justify-center gap-2 p-4 bg-green-500 text-white rounded-xl font-semibold"
          >
            <FiSave className="w-5 h-5" />
            Save Plan
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onGrocery}
            className="flex items-center justify-center gap-2 p-4 bg-blue-500 text-white rounded-xl font-semibold"
          >
            <FiShoppingCart className="w-5 h-5" />
            Grocery List
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNutrition}
            className="flex items-center justify-center gap-2 p-4 bg-purple-500 text-white rounded-xl font-semibold"
          >
            <FiBarChart2 className="w-5 h-5" />
            Nutrition Stats
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onExport}
            className="flex items-center justify-center gap-2 p-4 bg-orange-500 text-white rounded-xl font-semibold"
          >
            <FiDownload className="w-5 h-5" />
            Export PDF
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
