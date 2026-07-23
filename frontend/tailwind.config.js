/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#faf8ff',
        surface: '#faf8ff',
        'surface-container': '#ededf9',
        'surface-container-high': '#e7e7f3',
        'surface-container-low': '#f3f3fa',
        primary: {
          DEFAULT: '#004ac6',
          container: '#2563eb',
        },
        secondary: {
          DEFAULT: '#712ae2',
          container: '#8a4cfc',
        },
        tertiary: {
          DEFAULT: '#4338d9',
          container: '#5d55f3',
        },
        'on-surface': '#191b23',
        'on-surface-variant': '#434655',
        outline: '#737686',
        error: '#ba1a1a',
        success: '#10b981',
        warning: '#f59e0b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out',
        'slideUp': 'slideUp 0.5s ease-out',
        'slideInRight': 'slideInRight 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '.8', filter: 'brightness(1.5)' },
        }
      }
    },
  },
  plugins: [],
}
