'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUser, FiHeart, FiSettings, FiSave, FiDownload, FiShoppingCart, FiBarChart2, FiClock, FiCheck } from 'react-icons/fi'
import { GiMeal } from 'react-icons/gi'
import toast from 'react-hot-toast'
import { generateMealPlan } from '@/lib/gemini'
import MealPlanDisplay from '@/components/MealPlanDisplay'
import GroceryList from '@/components/GroceryList'
import NutritionDashboard from '@/components/NutritionDashboard'
import LoadingAnimation from '@/components/LoadingAnimation'

export default function PlannerPage() {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    healthGoal: '',
    preferences: '',
  })
  
  const [mealPlan, setMealPlan] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showGrocery, setShowGrocery] = useState(false)
  const [showNutrition, setShowNutrition] = useState(false)
  const [savedPlans, setSavedPlans] = useState([])

  const quickTemplates = [
    { icon: '🔥', title: 'Weight Loss', goal: 'weight loss and calorie deficit' },
    { icon: '💪', title: 'Muscle Gain', goal: 'muscle gain and strength training' },
    { icon: '❤️', title: 'Heart Health', goal: 'heart health and cholesterol management' },
    { icon: '🍃', title: 'Diabetes Care', goal: 'diabetes management and blood sugar control' },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleTemplateClick = (goal) => {
    setFormData(prev => ({ ...prev, healthGoal: goal }))
    toast.success('Template applied! Customize as needed.')
  }

  const handleGeneratePlan = async () => {
    // Validation
    if (!formData.age || !formData.healthGoal) {
      toast.error('Please fill in your age and health goal')
      return
    }

    if (formData.age < 1 || formData.age > 120) {
      toast.error('Please enter a valid age')
      return
    }

    setIsGenerating(true)

    try {
      const plan = await generateMealPlan(formData)
      setMealPlan(plan)
      toast.success('🎉 Your meal plan is ready!')
    } catch (error) {
      toast.error('Failed to generate meal plan. Please try again.')
      console.error(error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSavePlan = () => {
    if (!mealPlan) return

    const planName = prompt('Enter a name for this meal plan:')
    if (!planName) return

    const savedPlan = {
      id: Date.now(),
      name: planName,
      date: new Date().toISOString(),
      formData,
      mealPlan,
    }

    const plans = JSON.parse(localStorage.getItem('mealPlans') || '[]')
    plans.push(savedPlan)
    localStorage.setItem('mealPlans', JSON.stringify(plans))
    setSavedPlans(plans)

    toast.success(`✅ Saved "${planName}"!`)
  }

  const handleExportPDF = () => {
    toast.success('PDF export feature coming soon!')
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ y: [0, 30, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-20 w-64 h-64 bg-primary-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-secondary-200/30 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="text-5xl">🌿</span>
            <h1 className="text-5xl font-black gradient-text">Mealora</h1>
          </div>
          <p className="text-xl text-gray-600">Create Your Personalized Meal Plan</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="glass p-8 rounded-3xl shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl text-white">
                  <FiUser className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Your Profile</h2>
                  <p className="text-gray-600">Tell us about yourself</p>
                </div>
              </div>

              {/* Age Input */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Age
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Enter your age"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all"
                />
              </div>

              {/* Gender Selection */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Gender
                </label>
                <div className="flex gap-4">
                  {['male', 'female', 'other'].map((gender) => (
                    <motion.button
                      key={gender}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFormData(prev => ({ ...prev, gender }))}
                      className={`flex-1 py-3 rounded-xl font-semibold capitalize transition-all ${
                        formData.gender === gender
                          ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-glow'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {gender === 'male' ? '👨' : gender === 'female' ? '👩' : '⚧️'} {gender}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Health Goal */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Health Goal or Condition
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  name="healthGoal"
                  value={formData.healthGoal}
                  onChange={handleInputChange}
                  placeholder="e.g., Weight loss, Build muscle"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all"
                />
              </div>

              {/* Quick Templates */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  ⚡ Quick Start Templates
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {quickTemplates.map((template, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTemplateClick(template.goal)}
                      className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 hover:border-primary-500 hover:shadow-lg transition-all text-left"
                    >
                      <div className="text-2xl mb-1">{template.icon}</div>
                      <div className="text-sm font-semibold text-gray-900">{template.title}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Preferences */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Food Preferences & Allergies (Optional)
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  name="preferences"
                  value={formData.preferences}
                  onChange={handleInputChange}
                  placeholder="List any foods you love, dislike, or are allergic to..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all resize-none"
                />
              </div>

              {/* Generate Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGeneratePlan}
                disabled={isGenerating}
                className="w-full py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold rounded-xl shadow-glow hover:shadow-glow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
              >
                {isGenerating ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <GiMeal className="w-6 h-6" />
                    Generate My Meal Plan
                  </>
                )}
              </motion.button>
            </div>

            {/* Pro Tip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 p-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl text-white"
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">💡</div>
                <div>
                  <h3 className="font-bold mb-1">Pro Tip</h3>
                  <p className="text-sm opacity-90">
                    The more specific you are about your goals and preferences, the better your personalized plan will be!
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Results */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="glass p-8 rounded-3xl shadow-xl min-h-[600px]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl text-white">
                    <GiMeal className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Your Meal Plan</h2>
                    <p className="text-gray-600">AI-Generated Results</p>
                  </div>
                </div>

                {/* Action Buttons */}
                {mealPlan && !isGenerating && (
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleSavePlan}
                      className="p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                      title="Save Plan"
                    >
                      <FiSave className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowGrocery(true)}
                      className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                      title="Grocery List"
                    >
                      <FiShoppingCart className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowNutrition(true)}
                      className="p-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors"
                      title="Nutrition Stats"
                    >
                      <FiBarChart2 className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleExportPDF}
                      className="p-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
                      title="Export PDF"
                    >
                      <FiDownload className="w-5 h-5" />
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Content */}
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <LoadingAnimation key="loading" />
                ) : mealPlan ? (
                  <MealPlanDisplay key="plan" plan={mealPlan} />
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center"
                  >
                    <div className="text-8xl mb-6">🍽️</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Ready to Get Started?
                    </h3>
                    <p className="text-gray-600 max-w-md">
                      Fill out the form and click &quot;Generate My Meal Plan&quot; to receive your personalized 7-day vegetarian meal plan!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showGrocery && mealPlan && (
          <GroceryList
            mealPlan={mealPlan}
            onClose={() => setShowGrocery(false)}
          />
        )}
        {showNutrition && mealPlan && (
          <NutritionDashboard
            mealPlan={mealPlan}
            onClose={() => setShowNutrition(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

