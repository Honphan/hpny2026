import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Heart } from 'lucide-react'
import { addFeedback } from '../../firebase/services'

export default function FeedbackModal({ isOpen, onClose, username }) {
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) return
    setSending(true)

    const success = await addFeedback(username, message.trim())
    setSending(false)
    
    if (success) {
      setSent(true)
      setTimeout(() => {
        onClose()
        setSent(false)
        setMessage('')
      }, 2000)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md glass-red rounded-2xl p-6 shadow-gold-lg"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-tet-gold-300/60 hover:text-tet-gold-300 transition-colors"
            >
              <X size={20} />
            </button>

            {!sent ? (
              <>
                {/* Header */}
                <div className="text-center mb-6">
                  <span className="text-3xl mb-2 block">💌</span>
                  <h3 className="font-calligraphy text-2xl text-gradient-gold">
                    Gửi Lời Chúc Lại
                  </h3>
                  <p className="text-tet-red-200/60 text-sm mt-1 font-body">
                    Lì xì lại một lời chúc cho bé khum bé bùn !
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Viết lời chúc cho bé tại đây..."
                      rows={4}
                      className="tet-input resize-none"
                      maxLength={500}
                    />
                    <p className="text-right text-tet-gold-500/40 text-xs mt-1">
                      {message.length}/500
                    </p>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={!message.trim() || sending}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="tet-btn w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-tet-lacquer border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <Send size={18} />
                        Gửi Lời Chúc
                      </>
                    )}
                  </motion.button>
                </form>
              </>
            ) : (
              /* Success state */
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl mb-4"
                >
                  <Heart className="inline-block text-tet-peach" size={48} fill="currentColor" />
                </motion.div>
                <h3 className="font-calligraphy text-2xl text-gradient-gold mb-2">
                  Đã Gửi Thành Công!
                </h3>
                <p className="text-tet-red-200/70 font-body">
                  Cảm ơn bạn đã gửi lời chúc 🧧
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
