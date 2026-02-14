import { useEffect, useState } from 'react'

const PETAL_COUNT = 25

function createPetal(index) {
  return {
    id: index,
    left: Math.random() * 100,
    size: Math.random() * 10 + 8,
    delay: Math.random() * 8,
    duration: Math.random() * 6 + 7,
    swayDuration: Math.random() * 3 + 2,
    opacity: Math.random() * 0.4 + 0.4,
    rotation: Math.random() * 360,
  }
}

export default function FallingBlossoms() {
  const [petals, setPetals] = useState([])

  useEffect(() => {
    setPetals(Array.from({ length: PETAL_COUNT }, (_, i) => createPetal(i)))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.left}%`,
            top: '-20px',
            animation: `fall ${petal.duration}s linear ${petal.delay}s infinite, sway ${petal.swayDuration}s ease-in-out ${petal.delay}s infinite`,
          }}
        >
          {/* Petal SVG shape */}
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            style={{
              opacity: petal.opacity,
              transform: `rotate(${petal.rotation}deg)`,
              filter: 'drop-shadow(0 0 3px rgba(255, 183, 197, 0.5))',
            }}
          >
            <ellipse
              cx="12"
              cy="8"
              rx="6"
              ry="8"
              fill="url(#petalGrad)"
              transform="rotate(15, 12, 12)"
            />
            <ellipse
              cx="12"
              cy="8"
              rx="5"
              ry="7"
              fill="url(#petalGrad2)"
              transform="rotate(-10, 12, 12)"
            />
            <defs>
              <radialGradient id="petalGrad" cx="50%" cy="30%">
                <stop offset="0%" stopColor="#FFC0CB" />
                <stop offset="60%" stopColor="#FFB7C5" />
                <stop offset="100%" stopColor="#FF8FA3" stopOpacity="0.3" />
              </radialGradient>
              <radialGradient id="petalGrad2" cx="50%" cy="30%">
                <stop offset="0%" stopColor="#FFD1DC" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FFB7C5" stopOpacity="0.1" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  )
}
