import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PlusCircle, Inbox, LayoutDashboard, Gift, MessageSquare } from 'lucide-react'
import { getAllWishes, subscribeFeedbacks } from '../../firebase/services'

export default function Dashboard() {
  const [wishCount, setWishCount] = useState(0)
  const [feedbackCount, setFeedbackCount] = useState(0)

  useEffect(() => {
    getAllWishes().then(wishes => setWishCount(wishes.length))
    const unsubscribe = subscribeFeedbacks((feedbacks) => {
      setFeedbackCount(feedbacks.length)
    })
    return () => unsubscribe()
  }, [])

  return (
    <div className="min-h-screen bg-lacquer-gradient p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl md:text-5xl text-gradient-gold mb-2">
            🧧 Admin Panel
          </h1>
          <p className="text-tet-red-300/60 font-body">
            Quản lý lời chúc Tết 2026
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-4 mb-10"
        >
          <div className="glass-dark rounded-xl p-6 text-center">
            <Gift className="mx-auto text-tet-gold-400 mb-2" size={28} />
            <p className="text-3xl font-bold text-tet-gold-300">{wishCount}</p>
            <p className="text-tet-red-300/50 text-sm font-body">Lời chúc đã tạo</p>
          </div>
          <div className="glass-dark rounded-xl p-6 text-center">
            <MessageSquare className="mx-auto text-tet-peach mb-2" size={28} />
            <p className="text-3xl font-bold text-tet-peach">{feedbackCount}</p>
            <p className="text-tet-red-300/50 text-sm font-body">Feedback nhận được</p>
          </div>
        </motion.div>

        {/* Navigation cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/admin-tet-2026/add"
              className="block glass-red rounded-2xl p-8 hover:shadow-gold transition-all duration-300 group"
            >
              <PlusCircle className="text-tet-gold-400 mb-4 group-hover:scale-110 transition-transform" size={36} />
              <h3 className="font-calligraphy text-2xl text-tet-gold-300 mb-2">
                Thêm Lời Chúc
              </h3>
              <p className="text-tet-red-200/60 font-body text-sm">
                Tạo lời chúc riêng cho từng người bạn
              </p>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              to="/admin-tet-2026/inbox"
              className="block glass-red rounded-2xl p-8 hover:shadow-gold transition-all duration-300 group"
            >
              <Inbox className="text-tet-peach mb-4 group-hover:scale-110 transition-transform" size={36} />
              <h3 className="font-calligraphy text-2xl text-tet-peach mb-2">
                Hộp Thư Đến
              </h3>
              <p className="text-tet-red-200/60 font-body text-sm">
                Xem những lời chúc bạn bè gửi lại cho bạn
              </p>
            </Link>
          </motion.div>
        </div>

        {/* Back to home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-10"
        >
          <Link to="/" className="text-tet-gold-500/40 hover:text-tet-gold-400 font-body text-sm transition-colors">
            ← Về trang chủ
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
