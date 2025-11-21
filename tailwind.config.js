/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  // In Tailwind v4, theme is defined in CSS using @theme directive
  // Content paths are still needed for automatic content detection
  content: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}', './.storybook/**/*.{js,ts}'],
  plugins: []
};
