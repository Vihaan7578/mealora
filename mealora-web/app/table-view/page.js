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
            th { background-color: #00FFB2; color: white; }
            .day-header { background-color: #4FD1C5; color: white; font-weight: bold; }
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

  const showMealDetails = (day, mealType, content) => {
    // Create modal
    const modal = document.createElement('div')
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      backdrop-filter: blur(5px);
    `

    modal.innerHTML = `
      <div style="
        background: white;
        border-radius: 1rem;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      ">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <h3 style="font-size: 1.5rem; font-weight: 700; color: #F0F0F0; margin: 0;">
            ${day} - ${mealType}
          </h3>
          <button onclick="this.closest('.modal').remove()" style="
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #C0C0C0;
            padding: 0.5rem;
          ">×</button>
        </div>
        <div style="
          background: #2E2E2E;
          padding: 1.5rem;
          border-radius: 0.5rem;
          border-left: 4px solid #00FFB2;
          white-space: pre-wrap;
          line-height: 1.6;
          color: #F0F0F0;
          font-size: 1rem;
        ">${content}</div>
        <div style="text-align: center; margin-top: 1.5rem;">
          <button onclick="this.closest('.modal').remove()" style="
            background: linear-gradient(135deg, #00FFB2 0%, #4FD1C5 100%);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            cursor: pointer;
            font-size: 1rem;
          ">Close</button>
        </div>
      </div>
    `

    modal.className = 'modal'
    document.body.appendChild(modal)

    // Close on outside click
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.remove()
      }
    })
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
          className="p-4"
        >
          <div id="tableContent" className="overflow-x-auto">
            <table className="w-full border-collapse font-sans">
              <thead>
                <tr className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
                  <th className="px-4 py-4 text-left font-semibold text-lg">Day</th>
                  <th className="px-4 py-4 text-center font-semibold text-lg">Meal 1B</th>
                  <th className="px-4 py-4 text-center font-semibold text-lg">Meal 2L</th>
                  <th className="px-4 py-4 text-center font-semibold text-lg">Meal 3D</th>
                  <th className="px-4 py-4 text-center font-semibold text-lg">Meal 4S</th>
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
                      className="border-b border-gray-200"
                    >
                      <td className="px-4 py-4 font-bold text-white text-lg bg-gradient-to-r from-green-500 to-emerald-500">
                        {day}
                      </td>
                      <td 
                        className="px-4 py-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition-all"
                        onClick={() => showMealDetails(day, 'Breakfast', meals.breakfast || 'Not specified')}
                      >
                        <div className="font-semibold text-gray-700">Click to view</div>
                      </td>
                      <td 
                        className="px-4 py-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition-all"
                        onClick={() => showMealDetails(day, 'Lunch', meals.lunch || 'Not specified')}
                      >
                        <div className="font-semibold text-gray-700">Click to view</div>
                      </td>
                      <td 
                        className="px-4 py-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition-all"
                        onClick={() => showMealDetails(day, 'Dinner', meals.dinner || 'Not specified')}
                      >
                        <div className="font-semibold text-gray-700">Click to view</div>
                      </td>
                      <td 
                        className="px-4 py-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition-all"
                        onClick={() => showMealDetails(day, 'Snacks', meals.snacks || 'Not specified')}
                      >
                        <div className="font-semibold text-gray-700">Click to view</div>
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
