/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        'gold': '#C9A84C',
        'gold-light': '#F0D080',
        'gold-dark': '#8B6914',
        'chrome': '#C0C0C0',
        'steel': '#71797E',
        'obsidian': '#0A0A0A',
        'gunmetal': '#2A2D2E',
        'platinum': '#E5E4E2',
        'graphite': '#474A51',
      },
      fontFamily: {
        'mono': ['"Space Mono"', 'monospace'],
        'display': ['"Bebas Neue"', '"Inter"', 'sans-serif'],
        'body': ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glitch': 'glitch 0.5s steps(1) infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glitch: {
          '0%, 100%': { clipPath: 'inset(0 0 100% 0)' },
          '20%': { clipPath: 'inset(33% 0 33% 0)' },
          '40%': { clipPath: 'inset(0 0 66% 0)' },
          '60%': { clipPath: 'inset(66% 0 0 0)' },
          '80%': { clipPath: 'inset(33% 0 0 0)' },
        }
      }
    },
  },
  plugins: [],
}
