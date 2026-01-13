const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          500: '#3B82F6',
          700: '#1D4ED8'
        },
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10B981'
        },
        warning: '#F59E0B',
        danger: '#EF4444',
        info: '#6366F1'
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans]
      },
      boxShadow: {
        card: '0 10px 30px rgba(15, 23, 42, 0.1)'
      }
    }
  },
  plugins: []
};
