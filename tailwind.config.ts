import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode
        'bg-light': '#FFFFFF',
        'text-light': '#000000',
        'text-light-secondary': '#666666',
        'border-light': '#E5E5E5',

        // Dark mode
        'bg-dark': '#0A0A0A',
        'text-dark': '#FFFFFF',
        'text-dark-secondary': '#999999',
        'border-dark': '#2A2A2A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'h1': '3.5rem',
        'h2': '2.5rem',
        'body': '1.125rem',
      },
      maxWidth: {
        'content': '1200px',
      },
      spacing: {
        'section': '6rem',
      },
    },
  },
  plugins: [],
}

export default config
