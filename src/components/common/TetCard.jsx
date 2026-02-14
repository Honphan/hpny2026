import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const capitalize = (str) =>
  str
    ?.split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ') ?? ''

export default function TetCard({ content, username }) {
  const [isOpen, setIsOpen] = useState(false)
  const [showContent, setShowContent] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
    // Delay content reveal for dramatic effect
    setTimeout(() => setShowContent(true), 800)
  }

  return (
    <div className="w-full max-w-md mx-auto perspective-1000">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* === ENVELOPE CLOSED === */
          <motion.div
            key="envelope"
            initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onClick={handleOpen}
            className="cursor-pointer group"
          >
            <div className="relative bg-gradient-to-br from-tet-red-500 via-tet-red-600 to-tet-red-700 rounded-2xl p-8 shadow-envelope hover:shadow-gold-lg transition-shadow duration-500">
              {/* Gold border frame */}
              <div className="absolute inset-2 border-2 border-tet-gold-500/50 rounded-xl pointer-events-none" />
              <div className="absolute inset-3 border border-tet-gold-500/20 rounded-lg pointer-events-none" />

              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-tet-gold-400/60 rounded-tl-md" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-tet-gold-400/60 rounded-tr-md" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-tet-gold-400/60 rounded-bl-md" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-tet-gold-400/60 rounded-br-md" />

              {/* Center content */}
              <div className="text-center py-8 space-y-4">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl"
                >
                  🧧
                </motion.div>
                <h3 className="font-display text-3xl text-gradient-gold">
                  Lì Xì Dành Cho Bạn
                </h3>
                <p className="font-calligraphy text-tet-gold-200 text-lg">
                  {capitalize(username)}
                </p>
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-tet-gold-300/60 text-sm mt-4"
                >
                  ✨ Chạm để mở ✨
                </motion.p>
              </div>

              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: 'linear-gradient(105deg, transparent 40%, rgba(255,215,0,0.1) 45%, rgba(255,215,0,0.2) 50%, rgba(255,215,0,0.1) 55%, transparent 60%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.5s ease-in-out infinite',
                }}
              />
            </div>
          </motion.div>
        ) : (
          /* === ENVELOPE OPEN — WISH REVEALED === */
          <motion.div
            key="wish"
            initial={{ scale: 0.5, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative bg-gradient-to-br from-tet-red-600 via-tet-red-700 to-tet-red-800 rounded-2xl p-1 shadow-envelope">
              {/* Gold border glow */}
              <div className="absolute inset-0 rounded-2xl animate-glow" />

              <div className="relative bg-gradient-to-br from-tet-red-700/90 to-tet-red-900/90 rounded-xl p-8 backdrop-blur-sm">
                {/* Inner gold frame */}
                <div className="absolute inset-3 border border-tet-gold-500/30 rounded-lg pointer-events-none" />

                {/* Decorative top */}
                <div className="text-center mb-6">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                    className="inline-block text-4xl"
                  >
                    🌸
                  </motion.span>
                </div>

                {/* Username */}
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center font-calligraphy text-2xl text-tet-gold-300 mb-6"
                >
                  Gửi đến {capitalize(username)} thân mến,
                </motion.h3>

                {/* Wish content — typewriter style */}
                {showContent && (
                  <WishText content={content} />
                )}

                {/* Closing decoration */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                  className="text-center mt-8 space-y-2"
                >
                  <p className="font-display text-2xl text-gradient-gold">
                    Chúc Mừng Năm Mới 2026
                  </p>
                  <p className="text-tet-peach text-sm">🧧 Năm Bính Ngọ 🧧</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* Typewriter text component */
function WishText({ content }) {
  const lines = content.split('\n').filter(Boolean)

  return (
    <div className="space-y-3 px-4">
      {lines.map((line, index) => (
        <motion.p
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: index * 0.4 + 0.2,
            duration: 0.6,
            ease: 'easeOut',
          }}
          className="font-body text-lg text-tet-silk/90 leading-relaxed"
        >
          {line}
        </motion.p>
      ))}
    </div>
  )
}
