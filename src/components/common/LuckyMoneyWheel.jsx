import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send } from 'lucide-react'
import { saveSpinResult, saveBankInfo } from '../../firebase/services'

const PRIZES = [
  { amount: 50000, label: '50K', color: '#FFD700', textColor: '#1A0A0A' },
  { amount: 10000, label: '10K', color: '#DC2626', textColor: '#FFD700' },
  { amount: 20000, label: '20K', color: '#D97706', textColor: '#FFF' },
  { amount: 10000, label: '10K', color: '#991B1B', textColor: '#FFD700' },
  { amount: 1000,  label: '1K',  color: '#B8960C', textColor: '#1A0A0A' },
  { amount: 10000, label: '10K', color: '#DC2626', textColor: '#FFD700' },
  { amount: 10000, label: '10K', color: '#991B1B', textColor: '#FFD700' },
  { amount: 20000, label: '20K', color: '#B45309', textColor: '#FFF' },
  { amount: 10000, label: '10K', color: '#DC2626', textColor: '#FFD700' },
  { amount: 10000, label: '10K', color: '#991B1B', textColor: '#FFD700' },
]

const SEGMENT_ANGLE = 360 / PRIZES.length

const FUN_MESSAGES = [
  'Tiền mừng tuổi lấy lộc là chính nha mọi người 😆',
  'Của ít lòng nhiều nha! 🧧',
  'Năm mới phát tài phát lộc! 💰',
]

export default function LuckyMoneyWheel({ username, onClose }) {
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState(null)
  const [rotation, setRotation] = useState(0)
  const [bankName, setBankName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [bankSaved, setBankSaved] = useState(false)
  const [savingBank, setSavingBank] = useState(false)
  const [funMessage] = useState(
    FUN_MESSAGES[Math.floor(Math.random() * FUN_MESSAGES.length)]
  )

  const handleSpin = useCallback(async () => {
    if (spinning) return
    setSpinning(true)

    // Weighted random: 50K ~1%, 20K ~5%, 1K ~4%, 10K fills rest
    const weights = PRIZES.map(p =>
      p.amount === 50000 ? 1 : p.amount === 20000 ? 5 : p.amount === 1000 ? 4 : 10
    )
    const totalWeight = weights.reduce((a, b) => a + b, 0)
    let rand = Math.random() * totalWeight
    let prizeIndex = 0
    for (let i = 0; i < weights.length; i++) {
      rand -= weights[i]
      if (rand <= 0) { prizeIndex = i; break }
    }
    const prize = PRIZES[prizeIndex]

    const segmentCenter = prizeIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2
    const fullSpins = 5 + Math.floor(Math.random() * 3)
    const targetRotation = fullSpins * 360 + (360 - segmentCenter)

    setRotation(prev => prev + targetRotation)

    setTimeout(async () => {
      const saveResult = await saveSpinResult(username, prize.amount)

      if (saveResult) {
        setResult({ amount: saveResult.amount, alreadySpun: saveResult.alreadySpun })
      } else {
        setResult({ amount: prize.amount, alreadySpun: false })
      }
      setSpinning(false)
    }, 4500)
  }, [spinning, username])

  const handleSaveBank = async () => {
    if (!bankName.trim() || !accountNumber.trim()) return
    setSavingBank(true)
    await saveBankInfo(username, bankName.trim(), accountNumber.trim())
    setSavingBank(false)
    setBankSaved(true)
  }

  const formatAmount = (amount) => {
    if (amount >= 1000) return `${amount / 1000}K`
    return `${amount}`
  }

  return (
    <div className="text-center">
      {!result ? (
        <>
          {/* Wheel */}
          <div className="relative w-72 h-72 mx-auto mb-6">
            {/* Pointer / indicator at top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
              <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] 
                              border-l-transparent border-r-transparent border-t-yellow-400
                              drop-shadow-lg" />
            </div>

            {/* Spinning wheel */}
            <motion.div
              className="w-full h-full rounded-full relative overflow-hidden border-4 border-yellow-500/80 shadow-gold-lg"
              animate={{ rotate: rotation }}
              transition={{ duration: 4, ease: [0.2, 0.8, 0.3, 1] }}
              style={{
                background: `conic-gradient(${PRIZES.map((p, i) => {
                  const start = (i * SEGMENT_ANGLE)
                  const end = ((i + 1) * SEGMENT_ANGLE)
                  return `${p.color} ${start}deg ${end}deg`
                }).join(', ')})`,
              }}
            >
              {/* Prize labels */}
              {PRIZES.map((prize, i) => {
                const angle = i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2
                return (
                  <div
                    key={i}
                    className="absolute top-0 left-1/2 h-1/2 origin-bottom"
                    style={{
                      transform: `translateX(-50%) rotate(${angle}deg)`,
                      width: '40px',
                    }}
                  >
                    <span
                      className="block text-xs font-bold mt-6"
                      style={{ color: prize.textColor, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                    >
                      {prize.label}
                    </span>
                  </div>
                )
              })}

              {/* Center circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 
                                border-2 border-yellow-300 shadow-lg flex items-center justify-center">
                  <span className="text-lg">🧧</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Spin button */}
          <motion.button
            onClick={handleSpin}
            disabled={spinning}
            whileHover={!spinning ? { scale: 1.05 } : {}}
            whileTap={!spinning ? { scale: 0.95 } : {}}
            className="tet-btn text-lg px-10 py-3 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {spinning ? (
              <span className="flex items-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  🎰
                </motion.span>
                Đang quay...
              </span>
            ) : (
              '🎰 Quay Lì Xì'
            )}
          </motion.button>

          <p className="text-tet-red-200/100 text-xs mt-3 font-body">
            99% con bạc dừng lại trước khi thắng lớn
          </p>
        </>
      ) : (
        /* === RESULT === */
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="space-y-4"
        >
          {/* Envelope animation */}
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-5xl"
          >
            🧧
          </motion.div>

          {/* Title */}
          <h3 className="font-display text-2xl text-gradient-gold">
            {result.alreadySpun ? 'Bé Đã Nhận Lì Xì Rồi Quay Gì Nữa' : 'Chúc Mừng Bé Nha'}
          </h3>

          {/* Amount badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          >
            <div className="inline-block relative">
              <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 
                              text-tet-lacquer font-bold text-3xl px-8 py-3 rounded-2xl 
                              shadow-gold-lg border-2 border-yellow-300/50">
                {formatAmount(result.amount)} VNĐ
              </div>
              <motion.div
                animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full"
              />
              <motion.div
                animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-1 -left-1 w-2 h-2 bg-yellow-400 rounded-full"
              />
            </div>
          </motion.div>

          {/* Fun message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-tet-peach font-body text-sm"
          >
            {funMessage}
          </motion.p>

          {/* Bank info form */}
          {!result.alreadySpun && !bankSaved && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="space-y-3 pt-2"
            >
              <div className="h-px bg-tet-gold-500/20 mx-4" />

              <p className="text-tet-gold-300/80 font-body text-sm">
                Nhận lì xì lấy lộc thui nghèo nhưng giàu tình cảm
              </p>

              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="Ngân hàng"
                className="tet-input text-sm !py-2.5"
              />

              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Số tài khoản"
                className="tet-input text-sm !py-2.5"
              />

              <motion.button
                onClick={handleSaveBank}
                disabled={!bankName.trim() || !accountNumber.trim() || savingBank}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="tet-btn w-full flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                {savingBank ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-tet-lacquer border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Send size={14} />
                    Gửi Thông Tin
                  </>
                )}
              </motion.button>
            </motion.div>
          )}

          {/* Bank saved confirmation */}
          {bankSaved && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-tet-gold-500/10 border border-tet-gold-500/30 rounded-xl px-4 py-3"
            >
              <p className="text-tet-gold-300 font-body text-sm">
                Chờ xíu bé gửi lộc cho nha
              </p>
            </motion.div>
          )}

          {/* Close button */}
          <motion.button
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="tet-btn-outline text-sm"
          >
            {bankSaved || result.alreadySpun ? 'Đóng' : 'Để Sau'}
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
