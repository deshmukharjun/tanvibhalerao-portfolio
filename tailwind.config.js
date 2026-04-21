/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        terminal: ['"Terminal Grotesque"', '"Courier New"', 'Courier', 'monospace'],
        monument: ['"Monument Grotesk"', 'sans-serif'],
        mono:     ['"Monument Grotesk Mono"', '"Courier New"', 'monospace'],
        semimono: ['"Monument Grotesk Semi-Mono"', '"Courier New"', 'monospace'],
      },
    },
  },
  plugins: [],
}
