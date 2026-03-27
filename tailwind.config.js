/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom palette based on requirements
        primary: "#020617", // Indigo-950 / Deep Navy
        secondary: "#0F172A", // Slate-900
        accent: "#64748B", // Steel blue/grey
        background: "#F8FAFC", // Slate-50 / Silver Silver
        glass: "rgba(255, 255, 255, 0.95)",
      },
      borderRadius: {
        'xl': '12px',
      },
      transitionDuration: {
        '300': '300ms',
      },
    },
  },
  plugins: [],
}
