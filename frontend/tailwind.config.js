/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep emerald green from the logo
        brand: {
          50:  '#ecf6f1',
          100: '#d1ebdd',
          200: '#a3d6bb',
          300: '#6dba93',
          400: '#3f9a6e',
          500: '#1f7d54',
          600: '#136441',
          700: '#0d4e34',
          800: '#0a3d29',
          900: '#062c1e',
          950: '#031912'
        },
        // Warm gold accents from the logo
        gold: {
          50:  '#fbf6e8',
          100: '#f6ebc6',
          200: '#edd78a',
          300: '#e0bd56',
          400: '#d4a73b',
          500: '#b88a23',
          600: '#9a701b',
          700: '#7a5717',
          800: '#5e4316',
          900: '#3d2c0f'
        },
        cream: '#faf7f0',
        ivory: '#fdfbf5'
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'hero-overlay': 'linear-gradient(120deg, rgba(6,44,30,0.88) 0%, rgba(13,78,52,0.75) 100%)',
        'gold-gradient': 'linear-gradient(135deg, #d4a73b 0%, #b88a23 100%)',
        'green-gradient': 'linear-gradient(135deg, #0d4e34 0%, #062c1e 100%)'
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'shimmer': 'shimmer 3s linear infinite'
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      }
    },
  },
  plugins: [],
};
