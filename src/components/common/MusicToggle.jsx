import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { useGlobalAudio } from '../../hooks/AudioContext'

export default function MusicToggle() {
  const { isPlaying, toggle } = useGlobalAudio()

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, type: 'spring' }}
      onClick={toggle}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full glass-red
                 flex items-center justify-center text-tet-gold-300 
                 hover:text-tet-gold-200 hover:shadow-gold transition-all duration-300
                 border border-tet-gold-500/30"
      title={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
    >
      {isPlaying ? (
        <Volume2 size={20} />
      ) : (
        <VolumeX size={20} />
      )}

      {isPlaying && (
        <motion.div
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 rounded-full border border-tet-gold-400/40"
        />
      )}
    </motion.button>
  )
}
