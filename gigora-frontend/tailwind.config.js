/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A56DB',   // Primary Blue
        navy: '#1E3A5F',      // Dark Navy
        lightBlue: '#EFF6FF', // Light Blue
        darkText: '#111827',  // Body text[cite: 1]
        grayText: '#6B7280',  // Subtext[cite: 1]
        success: '#059669',   // Success Green[cite: 1]
      },
    },
  },
  plugins: [],
}