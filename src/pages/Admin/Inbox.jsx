import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, MessageCircle, Clock } from 'lucide-react'
import { subscribeFeedbacks } from '../../firebase/services'

export default function InboxPage() {
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = subscribeFeedbacks((data) => {
      setFeedbacks(data)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const formatTime = (timestamp) => {
    if (!timestamp?.toDate) return ''
    const date = timestamp.toDate()
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  return (
    <div className="min-h-screen bg-lacquer-gradient p-6 md:p-10">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Link to="/admin-tet-2026" className="text-tet-gold-300/60 hover:text-tet-gold-300 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="font-calligraphy text-3xl text-gradient-gold">Hộp Thư Đến</h1>
            <p className="text-tet-red-300/50 font-body text-sm">
              Lời chúc bạn bè gửi lại — Realtime 🔴
            </p>
          </div>
        </motion.div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-16">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="text-4xl inline-block"
            >
              💌
            </motion.div>
            <p className="text-tet-red-300/40 font-body mt-4">Đang tải...</p>
          </div>
        )}

        {/* Feedbacks */}
        {!loading && (
          <div className="space-y-4">
            <AnimatePresence>
              {feedbacks.map((fb, index) => (
                <motion.div
                  key={fb.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-red rounded-2xl p-6 hover:shadow-gold/20 transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-tet-gold-500/20 flex items-center justify-center shrink-0">
                      <MessageCircle size={18} className="text-tet-gold-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-calligraphy text-lg text-tet-gold-300">
                          {fb.fromUser}
                        </h3>
                      </div>
                      <p className="font-body text-tet-silk/80 leading-relaxed">
                        {fb.message}
                      </p>
                      {fb.createdAt && (
                        <div className="flex items-center gap-1 mt-3 text-tet-red-300/30 text-xs">
                          <Clock size={12} />
                          <span>{formatTime(fb.createdAt)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {feedbacks.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <span className="text-5xl block mb-4">📭</span>
                <p className="text-tet-red-300/40 font-body">
                  Chưa có lời chúc nào được gửi lại.
                </p>
                <p className="text-tet-red-300/25 font-body text-sm mt-1">
                  Chia sẻ link cho bạn bè để nhận lời chúc nhé!
                </p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
