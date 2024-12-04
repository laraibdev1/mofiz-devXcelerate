/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // Enable dark mode
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Include your project structure
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
      },
    },
  },
  plugins: [require('tailwindcss-animate')], // Include plugins
};
