import preset from '../../2_modules/theme/tailwind.preset.js';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [preset],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{html,md,mdx}",
  ],
  plugins: [],
}
