/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          maroon: '#6E001B',
          'maroon-dark': '#520014',
          'maroon-light': '#8F0E2A',
          'maroon-subtle': '#FCF5F6',
          gold: '#FFEDA0',
          'gold-dark': '#E6CE6C',
          'gold-light': '#FFF9DB',
          amber: '#FDA256',
        },
        surface: {
          cream: '#FFFDF9',
          muted: '#F8F9FA',
          border: '#E2E8F0',
        },
        charcoal: {
          900: '#111111',
          800: '#1E293B',
          600: '#475569',
          500: '#64748B',
          400: '#94A3B8',
          100: '#F1F5F9',
        }
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['"Source Sans 3"', '"Source Sans Pro"', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 10px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 12px 28px rgba(110, 0, 27, 0.12)',
        'drawer': '-4px 0 24px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'pill': '30px',
      }
    },
  },
  plugins: [],
}
