import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, MessageCircleHeart } from 'lucide-react'
import TetBackground from '../components/layout/TetBackground'
import TetCard from '../components/common/TetCard'
import FeedbackModal from '../components/common/FeedbackModal'
import FireworkEffect from '../components/animations/FireworkEffect'

import { getWishByUsername } from '../firebase/services'

export default function WishDetail() {
  const { username } = useParams()
  const navigate = useNavigate()
  const [wish, setWish] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showFeedback, setShowFeedback] = useState(false)
  const [triggerFireworks, setTriggerFireworks] = useState(false)

  useEffect(() => {
    async function fetchWish() {
      const data = await getWishByUsername(decodeURIComponent(username))
      if (data) {
        setWish(data)
        // Trigger fireworks after a short delay
        setTimeout(() => setTriggerFireworks(true), 1500)
      } else {
        navigate('/')
      }
      setLoading(false)
    }
    fetchWish()
  }, [username, navigate])

  if (loading) {
    return (
      <TetBackground>
        <div className="min-h-screen flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="text-5xl"
          >
            🧧
          </motion.div>
        </div>
      </TetBackground>
    )
  }

  return (
    <TetBackground>
      <FireworkEffect trigger={triggerFireworks} />


      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate('/')}
          className="fixed top-6 left-6 z-30 flex items-center gap-2 text-tet-gold-300/60 
                     hover:text-tet-gold-300 transition-colors font-body text-sm"
        >
          <ArrowLeft size={16} />
          Quay lại
        </motion.button>

        {/* Wish Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <TetCard 
            content={wish?.content || ''} 
            username={decodeURIComponent(username)} 
          />
        </motion.div>

        {/* Feedback button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3 }}
          onClick={() => setShowFeedback(true)}
          className="mt-8 tet-btn-outline flex items-center gap-2"
        >
          <MessageCircleHeart size={18} />
          Gửi Lời Chúc Lại
        </motion.button>

        {/* Decorative bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="mt-6 text-tet-red-300/30 text-xs font-body text-center"
        >
          Made with ❤️ — Tết Bính Ngọ 2026
        </motion.p>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        username={decodeURIComponent(username)}
      />
    </TetBackground>
  )
}
