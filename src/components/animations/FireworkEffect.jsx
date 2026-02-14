import { useEffect, useRef, useCallback } from 'react'

class Particle {
  constructor(x, y, color) {
    this.x = x
    this.y = y
    this.color = color
    const angle = Math.random() * Math.PI * 2
    const speed = Math.random() * 5 + 2
    this.vx = Math.cos(angle) * speed
    this.vy = Math.sin(angle) * speed
    this.gravity = 0.05
    this.alpha = 1
    this.decay = Math.random() * 0.02 + 0.01
    this.size = Math.random() * 3 + 1
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    this.vy += this.gravity
    this.alpha -= this.decay
    this.size *= 0.98
  }

  draw(ctx) {
    ctx.save()
    ctx.globalAlpha = Math.max(0, this.alpha)
    ctx.fillStyle = this.color
    ctx.shadowBlur = 6
    ctx.shadowColor = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

const COLORS = [
  '#FFD700', '#D4AF37', '#FF6B6B', '#FF4444',
  '#FFB7C5', '#FFA500', '#FF69B4', '#FFE4B5',
]

export default function FireworkEffect({ trigger = false }) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animFrameRef = useRef(null)

  const createBurst = useCallback((x, y) => {
    const count = 40 + Math.floor(Math.random() * 30)
    for (let i = 0; i < count; i++) {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      particlesRef.current.push(new Particle(x, y, color))
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particlesRef.current = particlesRef.current.filter(p => p.alpha > 0)
      particlesRef.current.forEach(p => {
        p.update()
        p.draw(ctx)
      })

      animFrameRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  useEffect(() => {
    if (trigger && canvasRef.current) {
      const w = canvasRef.current.width
      const h = canvasRef.current.height
      // Multiple bursts at different positions
      setTimeout(() => createBurst(w * 0.3, h * 0.3), 0)
      setTimeout(() => createBurst(w * 0.7, h * 0.2), 300)
      setTimeout(() => createBurst(w * 0.5, h * 0.4), 600)
      setTimeout(() => createBurst(w * 0.2, h * 0.5), 900)
      setTimeout(() => createBurst(w * 0.8, h * 0.35), 1200)
    }
  }, [trigger, createBurst])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
