/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff3366',
        secondary: '#2eff94',
        accent: '#147dff',
        background: '#1A1A1A',
      },
      animation: {
        'slow-zoom': 'slow-zoom 20s ease-in-out infinite',
        'title-slide': 'title-slide 10s ease-in-out infinite',
      },
      keyframes: {
        'slow-zoom': {
          '0%, 100%': { transform: 'scale(1.05)' },
          '50%': { transform: 'scale(1.1)' },
        },
        'title-slide': {
          '0%, 100%': { transform: 'translateY(0)', opacity: 1 },
          '50%': { transform: 'translateY(-20px)', opacity: 0 },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    require('tailwind-scrollbar'),
    nextui()
  ],
};