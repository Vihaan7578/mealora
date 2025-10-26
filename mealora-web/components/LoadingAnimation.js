'use client'

import { motion } from 'framer-motion'

export default function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* Animated Food Icons */}
      <div className="relative w-32 h-32 mb-8">
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
          <div className="absolute top-0 left-1/2 -translate-x-1/2 text-4xl">🥗</div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-4xl">🍎</div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-4xl">🥑</div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-4xl">🥕</div>
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
          <div className="text-6xl">🌿</div>
        </motion.div>
      </div>

      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <h3 className="text-2xl font-bold gradient-text mb-3">
          AI Nutritionist at Work
        </h3>
        
        <div className="space-y-2 mb-6">
          {['Analyzing your profile...', 'Creating personalized plan...', 'Optimizing for your goals...'].map((text, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 }}
              className="text-gray-600"
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
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

