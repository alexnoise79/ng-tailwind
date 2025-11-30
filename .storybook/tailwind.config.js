/** @type {import('tailwindcss').Config} */
module.exports = {
  // In Tailwind v4:
  // - Theme is defined in CSS using @theme directive
  // - Dark mode is configured in CSS using @custom-variant directive
  // - Content paths are still needed for automatic content detection
  content: ['../apps/**/*.{html,ts}', '../libs/**/*.{html,ts}', './**/*.{js,ts}'],
  plugins: []
};
