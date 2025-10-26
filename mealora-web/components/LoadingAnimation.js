'use client'

import { motion } from 'framer-motion'

export default function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      {/* Animated Food Icons */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mb-6 sm:mb-8">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 text-2xl sm:text-3xl lg:text-4xl">🥗</div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-2xl sm:text-3xl lg:text-4xl">🍎</div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-2xl sm:text-3xl lg:text-4xl">🥑</div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-2xl sm:text-3xl lg:text-4xl">🥕</div>
        </motion.div>
        
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-4xl sm:text-5xl lg:text-6xl">🌿</div>
        </motion.div>
      </div>

      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold gradient-text mb-3">
          AI Nutritionist at Work
        </h3>
        
        <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
          {['Analyzing your profile...', 'Creating personalized plan...', 'Optimizing for your goals...'].map((text, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 }}
              className="text-gray-600 text-sm sm:text-base"
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-48 sm:w-56 lg:w-64 h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
          />
        </div>
      </motion.div>
    </div>
  )
}

