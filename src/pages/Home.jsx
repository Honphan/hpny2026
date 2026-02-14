import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import TetBackground from '../components/layout/TetBackground'

import { getWishByUsername } from '../firebase/services'

export default function Home() {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [shake, setShake] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username.trim()) {
      triggerShake()
      return
    }

    setLoading(true)
    setError('')

    const wish = await getWishByUsername(username.trim())
    setLoading(false)

    if (wish) {
      navigate(`/wish/${encodeURIComponent(username.trim().toLowerCase())}`)
    } else {
      setError('Hmm, không tìm thấy tên của bạn. Kiểm tra lại nhé!')
      triggerShake()
    }
  }

  const triggerShake = () => {
    setShake(true)
    setTimeout(() => setShake(false), 500)
  }

  return (
    <TetBackground>

      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center max-w-lg w-full"
        >
          {/* Lantern decoration */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-7xl mb-4"
          >
            🏮
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display text-5xl md:text-7xl text-gradient-gold tet-text-shadow mb-3"
          >
            Chúc Mừng
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-display text-4xl md:text-6xl text-gradient-gold tet-text-shadow mb-2"
          >
            Năm Mới 2026
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="font-calligraphy text-xl text-tet-peach mb-12"
          >
            ✨ Năm Bính Ngọ — Mã Đáo Thành Công ✨
          </motion.p>

          {/* Username form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="relative">
              <motion.div
                animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                    setError('')
                  }}
                  placeholder="Nhập tên bé vào đây..."
                  className="tet-input text-center animate-pulse-gold"
                  autoFocus
                />
              </motion.div>

              {/* Sparkle decorations on input */}
              <Sparkles 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-tet-gold-500/30" 
                size={18} 
              />
              <Sparkles 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-tet-gold-500/30" 
                size={18} 
              />
            </div>

            {/* Error message */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-tet-gold-300 text-sm font-body"
              >
                {error}
              </motion.p>
            )}

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="tet-btn w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-tet-lacquer border-t-transparent rounded-full"
                />
              ) : (
                <>
                  Mở Lì Xì
                  <ArrowRight size={20} />
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Bottom decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-16 flex justify-center gap-4 text-3xl"
          >
            <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }}>🌸</motion.span>
            <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}>🎋</motion.span>
            <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}>🧧</motion.span>
            <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}>🎆</motion.span>
            <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}>🌸</motion.span>
          </motion.div>
        </motion.div>
      </div>
    </TetBackground>
  )
}
