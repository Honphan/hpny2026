import FallingBlossoms from '../animations/FallingBlossoms'

export default function TetBackground({ children }) {
  return (
    <div className="relative min-h-screen noise-overlay">
      {/* Base gradient */}
      <div className="fixed inset-0 bg-lacquer-gradient z-0" />

      {/* Decorative circles */}
      <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-tet-red-700/10 blur-3xl z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-tet-red-800/15 blur-3xl z-0" />
      <div className="fixed top-[30%] left-[20%] w-[300px] h-[300px] rounded-full bg-tet-gold-500/5 blur-3xl z-0 animate-float" />

      {/* Traditional pattern overlay */}
      <div
        className="fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(212,175,55,0.1) 35px, rgba(212,175,55,0.1) 36px)`,
        }}
      />

      {/* Falling blossoms */}
      <FallingBlossoms />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
