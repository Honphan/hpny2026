import { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react'

const AudioContext = createContext(null)

export function AudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  // Track if user explicitly muted
  const userMutedRef = useRef(false)

  useEffect(() => {
    const audio = new Audio('/assets/music/Di-Ve-Nha-JustaTee.mp3')
    audio.loop = true
    audio.volume = 0.3
    audio.preload = 'auto'
    audioRef.current = audio

    audio.addEventListener('play', () => setIsPlaying(true))
    audio.addEventListener('pause', () => setIsPlaying(false))

    // Auto-play on first user interaction
    let autoPlayed = false
    const autoPlay = () => {
      if (!autoPlayed && !userMutedRef.current) {
        autoPlayed = true
        audio.play().catch(() => {})
        cleanup()
      }
    }
    const cleanup = () => {
      document.removeEventListener('click', autoPlay)
      document.removeEventListener('touchstart', autoPlay)
      document.removeEventListener('keydown', autoPlay)
    }
    document.addEventListener('click', autoPlay)
    document.addEventListener('touchstart', autoPlay)
    document.addEventListener('keydown', autoPlay)

    return () => {
      cleanup()
      audio.pause()
      audio.src = ''
    }
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      userMutedRef.current = false
      audio.play().catch(() => {})
    } else {
      userMutedRef.current = true
      audio.pause()
    }
  }, [])

  return (
    <AudioContext.Provider value={{ isPlaying, toggle }}>
      {children}
    </AudioContext.Provider>
  )
}

export function useGlobalAudio() {
  return useContext(AudioContext)
}
