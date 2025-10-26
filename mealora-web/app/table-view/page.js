'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FiArrowLeft, FiDownload, FiPrinter } from 'react-icons/fi'

export default function TableView() {
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

  const parseMealsFromDay = (dayContent) => {
    const meals = {
      breakfast: '',
      lunch: '',
      dinner: '',
      snacks: ''
    }

    const lines = dayContent.split('\n')
    let currentMeal = ''
    let currentContent = []

    for (const line of lines) {
      const lowerLine = line.toLowerCase().trim()
      
      if (lowerLine.includes('breakfast') || lowerLine.includes('morning')) {
        if (currentMeal && currentContent.length > 0) {
          meals[currentMeal] = currentContent.join(' ').trim()
        }
        currentMeal = 'breakfast'
        currentContent = [line]
      } else if (lowerLine.includes('lunch') || lowerLine.includes('afternoon')) {
        if (currentMeal && currentContent.length > 0) {
          meals[currentMeal] = currentContent.join(' ').trim()
        }
        currentMeal = 'lunch'
        currentContent = [line]
      } else if (lowerLine.includes('dinner') || lowerLine.includes('evening')) {
        if (currentMeal && currentContent.length > 0) {
          meals[currentMeal] = currentContent.join(' ').trim()
        }
        currentMeal = 'dinner'
        currentContent = [line]
      } else if (lowerLine.includes('snack') || lowerLine.includes('evening snack')) {
        if (currentMeal && currentContent.length > 0) {
          meals[currentMeal] = currentContent.join(' ').trim()
        }
        currentMeal = 'snacks'
        currentContent = [line]
      } else if (line.trim() && currentMeal) {
        currentContent.push(line)
      }
    }

    if (currentMeal && currentContent.length > 0) {
      meals[currentMeal] = currentContent.join(' ').trim()
    }

    return meals
  }

  const handlePrint = () => {
    window.print()
  }

  const handleExport = () => {
    // Create a downloadable version
    const content = document.getElementById('tableContent').innerHTML
    const blob = new Blob([`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Meal Plan Table - Mealora</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 12px; text-align: left; border: 1px solid #ddd; }
            th { background-color: #6366F1; color: white; }
            .day-header { background-color: #10B981; color: white; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>🍽️ Mealora - 7-Day Meal Plan Table</h1>
          ${content}
        </body>
      </html>
    `], { type: 'text/html' })
    
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'meal-plan-table.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Table View...</h2>
          <p className="text-gray-600">Please wait while we organize your meal plan.</p>
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

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const daySections = mealPlan.text.split(/DAY \d+/i).filter(Boolean)

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
                <h1 className="text-2xl font-bold text-gray-900">📊 Table View</h1>
                <p className="text-gray-600">7-Day Meal Plan organized by day and meal type</p>
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
          className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
        >
          <div id="tableContent" className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="w-1/6 px-4 py-3 text-left font-semibold text-white bg-gradient-to-r from-primary-500 to-secondary-500">
                    Day
                  </th>
                  <th className="w-5/24 px-4 py-3 text-left font-semibold text-white bg-gradient-to-r from-primary-500 to-secondary-500">
                    Breakfast
                  </th>
                  <th className="w-5/24 px-4 py-3 text-left font-semibold text-white bg-gradient-to-r from-primary-500 to-secondary-500">
                    Lunch
                  </th>
                  <th className="w-5/24 px-4 py-3 text-left font-semibold text-white bg-gradient-to-r from-primary-500 to-secondary-500">
                    Dinner
                  </th>
                  <th className="w-5/24 px-4 py-3 text-left font-semibold text-white bg-gradient-to-r from-primary-500 to-secondary-500">
                    Snacks
                  </th>
                </tr>
              </thead>
              <tbody>
                {days.map((day, index) => {
                  const dayContent = daySections[index + 1] || 'No content available'
                  const meals = parseMealsFromDay(dayContent)
                  
                  return (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-4 font-bold text-white bg-gradient-to-r from-green-500 to-emerald-500">
                        {day}
                      </td>
                      <td className="px-4 py-4 text-gray-700">
                        {meals.breakfast || 'Not specified'}
                      </td>
                      <td className="px-4 py-4 text-gray-700">
                        {meals.lunch || 'Not specified'}
                      </td>
                      <td className="px-4 py-4 text-gray-700">
                        {meals.dinner || 'Not specified'}
                      </td>
                      <td className="px-4 py-4 text-gray-700">
                        {meals.snacks || 'Not specified'}
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
