'use client'

import { motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js'
import { Pie, Bar, Line } from 'react-chartjs-2'

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend)

export default function NutritionDashboard({ mealPlan, onClose }) {
  // Sample data - in production, parse from meal plan
  const macroData = {
    labels: ['Protein', 'Carbs', 'Fats'],
    datasets: [{
      data: [30, 50, 20],
      backgroundColor: [
        'rgba(0, 230, 160, 0.8)',
        'rgba(99, 102, 241, 0.8)',
        'rgba(245, 158, 11, 0.8)',
      ],
      borderWidth: 0,
    }],
  }

  const dailyCaloriesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Daily Calories',
      data: [1800, 1850, 1900, 1750, 1900, 2000, 1950],
      backgroundColor: 'rgba(0, 230, 160, 0.6)',
      borderColor: 'rgba(0, 230, 160, 1)',
      borderWidth: 2,
    }],
  }

  const weeklyTrendData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Calorie Intake',
      data: [1800, 1850, 1900, 1750, 1900, 2000, 1950],
      fill: true,
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      borderColor: 'rgba(99, 102, 241, 1)',
      tension: 0.4,
    }],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-xs sm:max-w-2xl lg:max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden mx-2 sm:mx-0"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="text-2xl sm:text-3xl lg:text-4xl">📊</div>
              <div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Nutrition Dashboard</h2>
                <p className="text-white/90 text-xs sm:text-sm">Visual insights into your meal plan</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors touch-friendly"
            >
              <FiX className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-120px)] sm:max-h-[calc(90vh-120px)]">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
            {[
              { label: 'Avg Calories', value: '1,880', icon: '🔥', color: 'from-orange-500 to-red-500' },
              { label: 'Protein', value: '30%', icon: '💪', color: 'from-green-500 to-emerald-500' },
              { label: 'Carbs', value: '50%', icon: '🌾', color: 'from-blue-500 to-indigo-500' },
              { label: 'Fats', value: '20%', icon: '🥑', color: 'from-yellow-500 to-amber-500' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-r ${stat.color} text-white p-3 sm:p-4 rounded-lg sm:rounded-xl`}
              >
                <div className="text-xl sm:text-2xl lg:text-3xl mb-1 sm:mb-2">{stat.icon}</div>
                <div className="text-lg sm:text-xl lg:text-2xl font-bold">{stat.value}</div>
                <div className="text-xs sm:text-sm opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Macro Distribution */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6"
            >
              <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-900">Macro Distribution</h3>
              <div className="h-48 sm:h-56 lg:h-64">
                <Pie data={macroData} options={chartOptions} />
              </div>
            </motion.div>

            {/* Daily Calories */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6"
            >
              <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-900">Daily Calorie Intake</h3>
              <div className="h-48 sm:h-56 lg:h-64">
                <Bar data={dailyCaloriesData} options={chartOptions} />
              </div>
            </motion.div>

            {/* Weekly Trend */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:col-span-2"
            >
              <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-900">Weekly Calorie Trend</h3>
              <div className="h-48 sm:h-56 lg:h-64">
                <Line data={weeklyTrendData} options={chartOptions} />
              </div>
            </motion.div>
          </div>

          {/* Nutritional Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 sm:mt-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl sm:rounded-2xl p-4 sm:p-6"
          >
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-900">✨ Nutritional Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              {[
                '✓ Balanced macro distribution for optimal health',
                '✓ Adequate protein for muscle maintenance',
                '✓ Complex carbs for sustained energy',
                '✓ Healthy fats for nutrient absorption',
              ].map((highlight, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                  <span className="text-green-500 font-bold">✓</span>
                  {highlight}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

