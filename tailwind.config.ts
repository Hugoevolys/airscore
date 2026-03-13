import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0F1117',
          light: '#161822',
          lighter: '#1C1F2E',
        },
        coral: {
          DEFAULT: '#FF5A5F',
          dark: '#E04E53',
          light: '#FF7A7E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
