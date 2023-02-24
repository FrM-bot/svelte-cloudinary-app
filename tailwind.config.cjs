/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'custom-cyan': 'rgba(var(--custom-cyan) / <alpha-value>)',
        'custom-dark': 'rgba(var(--custom-dark) / <alpha-value>)',
        'custom-dark-2': 'rgba(var(--custom-dark-2) / <alpha-value>)',
        'custom-white': 'rgba(var(--custom-white) / <alpha-value>)',
        'custom-pink': 'rgba(var(--custom-pink) / <alpha-value>)',
        primary: 'rgba(var(--primary) / <alpha-value>)',
        'text-color': 'rgba(var(--text-color) / <alpha-value>)',
        secondary: 'rgba(var(--secondary) / <alpha-value>)',
        tertiary: 'rgba(var(--tertiary) / <alpha-value>)'
      }
    },
  },
  plugins: [],
	darkMode: ['class', '[data-theme="dark"]']
};