import { useState, useRef, useCallback, useEffect } from 'react'

export default function useAudio(src) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  // Create audio element ONCE on mount
  useEffect(() => {
    if (!src) return

    const audio = new Audio(src)
    audio.loop = true
    audio.volume = 0.3
    audio.preload = 'auto'
    audioRef.current = audio

    audio.addEventListener('play', () => setIsPlaying(true))
    audio.addEventListener('pause', () => setIsPlaying(false))

    return () => {
      audio.pause()
      audio.src = ''
      audioRef.current = null
    }
  }, [src])

  const play = useCallback(() => {
    const audio = audioRef.current
    if (audio) {
      audio.play().catch(() => {})
    }
  }, [])

  const pause = useCallback(() => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
    }
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }, [])

  return { isPlaying, play, pause, toggle }
}
