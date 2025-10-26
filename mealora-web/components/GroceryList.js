'use client'

import { motion } from 'framer-motion'
import { FiX, FiCopy, FiCheck } from 'react-icons/fi'
import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { generateGroceryList } from '@/lib/gemini'

export default function GroceryList({ mealPlan, onClose }) {
  const [groceryList, setGroceryList] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copiedItems, setCopiedItems] = useState(new Set())

  useEffect(() => {
    loadGroceryList()
  }, [loadGroceryList])

  const loadGroceryList = useCallback(async () => {
    try {
      const list = await generateGroceryList(mealPlan)
      setGroceryList(list)
    } catch (error) {
      toast.error('Failed to generate grocery list')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [mealPlan])

  const handleCopyAll = () => {
    if (groceryList) {
      navigator.clipboard.writeText(groceryList)
      toast.success('Grocery list copied to clipboard!')
    }
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
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🛒</div>
              <div>
                <h2 className="text-2xl font-bold">Grocery Shopping List</h2>
                <p className="text-white/90 text-sm">Everything you need for the week</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-6xl mb-4"
              >
                🛒
              </motion.div>
              <p className="text-gray-600">Generating your shopping list...</p>
            </div>
          ) : (
            <>
              <div className="bg-gray-50 rounded-2xl p-6 max-h-[400px] overflow-y-auto mb-4">
                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 leading-relaxed">
                  {groceryList}
                </pre>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCopyAll}
                  className="flex-1 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <FiCopy className="w-5 h-5" />
                  Copy to Clipboard
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Close
                </motion.button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

