/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        forest:   '#1C3326',
        parchment:'#F5EDD8',
        gold:     '#C8973A',
        cream:    '#F0E8D0',
        sage:     '#7FA085',
        danger:   '#8B3A2A',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['Lora', 'Georgia', 'serif'],
      },
      keyframes: {
        'card-flip': {
          '0%':   { transform: 'rotateY(0deg)' },
          '50%':  { transform: 'rotateY(90deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
        'harmony-grow': {
          '0%':   { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'card-flip':    'card-flip 0.6s ease-in-out',
        'harmony-grow': 'harmony-grow 0.4s ease-out',
      },
    },
  },
  plugins: [],
}
