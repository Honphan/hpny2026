/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tet: {
          red: {
            50: '#FFF5F5',
            100: '#FFE0E0',
            200: '#FFB3B3',
            300: '#FF7A7A',
            400: '#FF4444',
            500: '#DC2626',
            600: '#B91C1C',
            700: '#991B1B',
            800: '#7F1D1D',
            900: '#5C1010',
            950: '#3B0808',
          },
          gold: {
            50: '#FFFEF5',
            100: '#FFF8DC',
            200: '#FFECB3',
            300: '#FFD700',
            400: '#F5C518',
            500: '#D4AF37',
            600: '#B8960C',
            700: '#8B7200',
            800: '#5C4B00',
            900: '#3D3200',
          },
          lacquer: '#1A0A0A',
          silk: '#FFF0F0',
          peach: '#FFB7C5',
        },
      },
      fontFamily: {
        calligraphy: ['"Dancing Script"', 'cursive'],
        body: ['"Philosopher"', 'serif'],
        display: ['"Great Vibes"', 'cursive'],
      },
      animation: {
        'fall': 'fall linear infinite',
        'fall-slow': 'fall 12s linear infinite',
        'fall-medium': 'fall 8s linear infinite',
        'fall-fast': 'fall 5s linear infinite',
        'sway': 'sway 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shake': 'shake 0.5s ease-in-out',
        'envelope-open': 'envelopeOpen 1s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'typewriter': 'typewriter 3s steps(40) forwards',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        fall: {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0.3' },
        },
        sway: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(30px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(212,175,55,0.3), 0 0 10px rgba(212,175,55,0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(212,175,55,0.6), 0 0 40px rgba(212,175,55,0.3)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        envelopeOpen: {
          '0%': { transform: 'rotateX(0deg)', transformOrigin: 'top' },
          '100%': { transform: 'rotateX(180deg)', transformOrigin: 'top' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        pulseGold: {
          '0%, 100%': { borderColor: 'rgba(212,175,55,0.4)' },
          '50%': { borderColor: 'rgba(212,175,55,1)' },
        },
      },
      backgroundImage: {
        'tet-gradient': 'linear-gradient(135deg, #991B1B 0%, #DC2626 30%, #B91C1C 70%, #7F1D1D 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)',
        'lacquer-gradient': 'linear-gradient(180deg, #1A0A0A 0%, #2D1010 50%, #1A0A0A 100%)',
      },
      boxShadow: {
        'gold': '0 4px 20px rgba(212,175,55,0.3)',
        'gold-lg': '0 8px 40px rgba(212,175,55,0.4)',
        'red': '0 4px 20px rgba(220,38,38,0.3)',
        'envelope': '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(212,175,55,0.2)',
      },
    },
  },
  plugins: [],
}
