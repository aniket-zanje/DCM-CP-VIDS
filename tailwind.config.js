/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vids: {
          ivory: '#FBFBF7',
          'ivory-warm': '#FAF8F3',
          'ivory-sand': '#F4EFE6',
          'ivory-card': '#FFFFFF',
          sage: {
            50: '#F4F7F4',
            100: '#E6EFE8',
            200: '#CEE0D2',
            300: '#A7C8AE',
            400: '#7BA784',
            500: '#4D7C58',
            600: '#3F6748',
            700: '#34543C',
            800: '#2A4331',
            900: '#1F3325',
          },
          charcoal: {
            900: '#19221C',
            800: '#25332A',
            700: '#37473D',
            600: '#4F6155',
            500: '#6E8074',
            400: '#94A49A',
            300: '#C2CDC6',
          },
          border: '#E5EAE5',
          'border-light': '#F0F4F0',
          sand: '#EFE9DE',
          'sand-text': '#5A4A38',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'clay': '0 8px 30px -4px rgba(35, 60, 45, 0.08), 0 2px 6px -1px rgba(35, 60, 45, 0.04)',
        'clay-hover': '0 14px 40px -4px rgba(35, 60, 45, 0.12), 0 4px 12px -2px rgba(35, 60, 45, 0.06)',
        'chip': 'inset 0 1px 2px rgba(255, 255, 255, 0.9), 0 4px 14px rgba(45, 80, 58, 0.08)',
        'led-green': '0 0 16px 4px rgba(34, 197, 94, 0.7)',
        'led-amber': '0 0 16px 4px rgba(245, 158, 11, 0.7)',
        'beveled': 'inset 0 2px 4px rgba(255, 255, 255, 0.9), 0 16px 40px -6px rgba(35, 60, 45, 0.12), 0 0 0 1.5px #E2EAE3',
      }
    },
  },
  plugins: [],
}
