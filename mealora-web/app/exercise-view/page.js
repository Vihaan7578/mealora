'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FiArrowLeft, FiDownload, FiPrinter, FiClock, FiRepeat, FiActivity, FiTarget } from 'react-icons/fi'

export default function ExerciseView() {
  const router = useRouter()
  const [mealPlan, setMealPlan] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get meal plan from session storage or props
    const storedPlan = sessionStorage.getItem('currentMealPlan')
    if (storedPlan) {
      setMealPlan(JSON.parse(storedPlan))
    }
    setLoading(false)
  }, [])

  const exercises = [
    {
      type: 'Cardio',
      title: 'Morning Cardio Routine',
      description: 'Start your day with light cardio to boost metabolism and energy levels. Perfect for burning calories and improving cardiovascular health.',
      duration: '20-30 minutes',
      frequency: '5-6 days/week',
      intensityLevel: 'Moderate',
      equipment: 'None required',
      color: 'from-orange-500 to-red-500',
      icon: '🏃‍♂️'
    },
    {
      type: 'Strength',
      title: 'Bodyweight Strength Training',
      description: 'Build lean muscle mass with bodyweight exercises. Focus on compound movements that work multiple muscle groups.',
      duration: '30-45 minutes',
      frequency: '3-4 days/week',
      intensityLevel: 'Moderate to High',
      equipment: 'None required',
      color: 'from-blue-500 to-indigo-500',
      icon: '💪'
    },
    {
      type: 'Flexibility',
      title: 'Yoga & Stretching',
      description: 'Improve flexibility, reduce stress, and enhance recovery with gentle yoga poses and stretching routines.',
      duration: '15-20 minutes',
      frequency: 'Daily',
      intensityLevel: 'Low',
      equipment: 'Yoga mat (optional)',
      color: 'from-green-500 to-emerald-500',
      icon: '🧘‍♀️'
    },
    {
      type: 'HIIT',
      title: 'High-Intensity Interval Training',
      description: 'Burn maximum calories in minimum time with short bursts of intense exercise followed by rest periods.',
      duration: '15-25 minutes',
      frequency: '2-3 days/week',
      intensityLevel: 'High',
      equipment: 'None required',
      color: 'from-purple-500 to-pink-500',
      icon: '⚡'
    },
    {
      type: 'Walking',
      title: 'Daily Walking Routine',
      description: 'Simple yet effective way to stay active throughout the day. Great for beginners and can be done anywhere.',
      duration: '30-60 minutes',
      frequency: 'Daily',
      intensityLevel: 'Low to Moderate',
      equipment: 'Comfortable shoes',
      color: 'from-teal-500 to-cyan-500',
      icon: '🚶‍♀️'
    }
  ]

  const handlePrint = () => {
    window.print()
  }

  const handleExport = () => {
    // Create a downloadable version
    const content = document.getElementById('exerciseContent').innerHTML
    const blob = new Blob([`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Exercise Recommendations - Mealora</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
            .exercise-card { background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
            .exercise-type { background: #007bff; color: white; padding: 8px 16px; border-radius: 4px; font-weight: bold; display: inline-block; margin-bottom: 10px; }
            .exercise-title { font-size: 1.25rem; font-weight: bold; margin-bottom: 10px; }
            .exercise-details { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-top: 15px; }
            .detail-item { background: white; padding: 10px; border-radius: 4px; text-align: center; }
            .detail-label { font-size: 0.75rem; color: #6c757d; font-weight: bold; text-transform: uppercase; }
            .detail-value { font-size: 1rem; font-weight: bold; margin-top: 5px; }
          </style>
        </head>
        <body>
          <h1>💪 Mealora - Exercise Recommendations</h1>
          ${content}
        </body>
      </html>
    `], { type: 'text/html' })
    
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'exercise-recommendations.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Exercise Recommendations...</h2>
          <p className="text-gray-600">Please wait while we prepare your workout routine.</p>
        </div>
      </div>
    )
  }

  if (!mealPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">No Meal Plan Found</h2>
          <p className="text-gray-600 mb-4">Please generate a meal plan first.</p>
          <button
            onClick={() => router.push('/planner')}
            className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Go to Planner
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FiArrowLeft className="w-5 h-5" />
                Back
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">💪 Exercise Recommendations</h1>
                <p className="text-gray-600">Personalized workout routines to complement your meal plan</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FiPrinter className="w-4 h-4" />
                Print
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <FiDownload className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Introduction */}
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Your Personalized Exercise Plan</h2>
            <p className="text-gray-700 leading-relaxed">
              These exercises are designed to complement your meal plan and help you achieve your health goals. 
              Always consult with a healthcare provider before starting any new exercise routine.
            </p>
          </div>

          {/* Exercise Cards */}
          <div id="exerciseContent" className="space-y-6">
            {exercises.map((exercise, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{exercise.icon}</div>
                  <div className="flex-1">
                    <div className={`inline-block px-4 py-2 rounded-lg text-white font-semibold text-sm bg-gradient-to-r ${exercise.color} mb-4`}>
                      {exercise.type}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{exercise.title}</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">{exercise.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white/50 rounded-lg p-3 text-center">
                        <FiClock className="w-5 h-5 text-gray-600 mx-auto mb-2" />
                        <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Duration</div>
                        <div className="text-sm font-bold text-gray-900">{exercise.duration}</div>
                      </div>
                      <div className="bg-white/50 rounded-lg p-3 text-center">
                        <FiRepeat className="w-5 h-5 text-gray-600 mx-auto mb-2" />
                        <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Frequency</div>
                        <div className="text-sm font-bold text-gray-900">{exercise.frequency}</div>
                      </div>
                      <div className="bg-white/50 rounded-lg p-3 text-center">
                        <FiActivity className="w-5 h-5 text-gray-600 mx-auto mb-2" />
                        <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Intensity</div>
                        <div className="text-sm font-bold text-gray-900">{exercise.intensityLevel}</div>
                      </div>
                      <div className="bg-white/50 rounded-lg p-3 text-center">
                        <FiTarget className="w-5 h-5 text-gray-600 mx-auto mb-2" />
                        <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Equipment</div>
                        <div className="text-sm font-bold text-gray-900">{exercise.equipment}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Tips Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl p-6 shadow-lg border border-primary-200"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                💡 General Exercise Guidelines
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 font-bold">•</span>
                    Start slowly and gradually increase intensity
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 font-bold">•</span>
                    Listen to your body and rest when needed
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 font-bold">•</span>
                    Stay hydrated throughout your workout
                  </li>
                </ul>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 font-bold">•</span>
                    Warm up before and cool down after exercise
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 font-bold">•</span>
                    Combine cardio, strength, and flexibility training
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 font-bold">•</span>
                    Track your progress and celebrate small wins
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
