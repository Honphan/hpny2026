import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Send, Trash2, User, FileText } from 'lucide-react'
import { addWish, getAllWishes, deleteWish } from '../../firebase/services'

export default function AddWish() {
  const [username, setUsername] = useState('')
  const [content, setContent] = useState('')
  const [wishes, setWishes] = useState([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    loadWishes()
  }, [])

  const loadWishes = async () => {
    const data = await getAllWishes()
    setWishes(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username.trim() || !content.trim()) return

    setLoading(true)
    const ok = await addWish(username.trim(), content.trim())
    setLoading(false)

    if (ok) {
      setSuccess(true)
      setUsername('')
      setContent('')
      loadWishes()
      setTimeout(() => setSuccess(false), 2000)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Xóa lời chúc này?')) return
    await deleteWish(id)
    loadWishes()
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
            <h1 className="font-calligraphy text-3xl text-gradient-gold">Thêm Lời Chúc</h1>
            <p className="text-tet-red-300/50 font-body text-sm">Tạo lời chúc cho từng người</p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass-dark rounded-2xl p-6 mb-8 space-y-4"
        >
          <div>
            <label className="flex items-center gap-2 text-tet-gold-300/70 text-sm font-body mb-2">
              <User size={14} /> Tên người nhận
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="vd: xuanhon, honphan ..."
              className="tet-input"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-tet-gold-300/70 text-sm font-body mb-2">
              <FileText size={14} /> Nội dung lời chúc
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Viết lời chúc Tết ..."
              rows={5}
              className="tet-input resize-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              type="submit"
              disabled={loading || !username.trim() || !content.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="tet-btn flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-tet-lacquer border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <Send size={16} />
                  Tạo Lời Chúc
                </>
              )}
            </motion.button>

            <AnimatePresence>
              {success && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-tet-gold-300 text-sm font-body"
                >
                  ✅ Đã tạo thành công!
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.form>

        {/* List of existing wishes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-calligraphy text-xl text-tet-gold-300/70 mb-4">
            📜 Danh sách lời chúc ({wishes.length})
          </h2>

          <div className="space-y-3">
            <AnimatePresence>
              {wishes.map((wish) => (
                <motion.div
                  key={wish.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-dark rounded-xl p-4 flex items-start justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-calligraphy text-lg text-tet-gold-300">
                      🧧 {wish.username}
                    </p>
                    <p className="text-tet-silk/60 text-sm font-body mt-1 line-clamp-2">
                      {wish.content}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(wish.id)}
                    className="text-tet-red-400/50 hover:text-tet-red-400 transition-colors shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {wishes.length === 0 && (
              <p className="text-center text-tet-red-300/30 font-body py-8">
                Chưa có lời chúc nào. Hãy tạo lời chúc đầu tiên! 🧧
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
