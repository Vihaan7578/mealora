/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: {
          50: 'rgba(0, 255, 178, 0.1)',
          100: 'rgba(0, 255, 178, 0.2)',
          200: 'rgba(0, 255, 178, 0.3)',
          300: 'rgba(0, 255, 178, 0.4)',
          400: 'rgba(0, 255, 178, 0.5)',
          500: '#00FFB2',        /* Neon Green */
          600: '#00CC8F',        /* Darker neon green */
          700: '#00A675',        /* Even darker */
          800: '#00805A',        /* Dark */
          900: '#005A3F',        /* Darkest */
        },
        secondary: {
          50: 'rgba(79, 209, 197, 0.1)',
          100: 'rgba(79, 209, 197, 0.2)',
          200: 'rgba(79, 209, 197, 0.3)',
          300: 'rgba(79, 209, 197, 0.4)',
          400: 'rgba(79, 209, 197, 0.5)',
          500: '#4FD1C5',        /* Aqua Blue */
          600: '#3BB5A9',        /* Darker aqua blue */
          700: '#2A998F',        /* Even darker */
          800: '#1F7D75',        /* Dark */
          900: '#14615B',        /* Darkest */
        },
        background: {
          primary: '#121212',    /* Charcoal Black */
          secondary: '#2E2E2E',  /* Slate Gray */
          tertiary: '#1A1A1A',   /* Darker charcoal */
        },
        text: {
          primary: '#F0F0F0',    /* Ghost White */
          secondary: '#C0C0C0',  /* Light gray */
          muted: '#888888',      /* Medium gray */
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-primary': 'linear-gradient(135deg, #00FFB2 0%, #4FD1C5 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #FFD93D 0%, #FF6B6B 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 255, 178, 0.5)',
        'glow-lg': '0 0 40px rgba(0, 255, 178, 0.6)',
        'glass': '0 8px 32px 0 rgba(46, 46, 46, 0.7)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

