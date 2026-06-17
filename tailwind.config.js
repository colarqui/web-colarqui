/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Arquidiocesanos Brand Colors 2024
        brand: {
          dark: '#12100B',      // Almost black
          gold: '#FBB823',      // Golden yellow
          coral: '#EE7363',     // Coral/salmon – decorative (icons, bg tints)
          'coral-dark': '#C24038', // WCAG AA-safe coral for text on light bg (5.1:1)
        },
        // Per-colegio dynamic colors (driven by CSS variables set on the page wrapper)
        colegio: {
          primary:    'rgb(var(--col-primary)   / <alpha-value>)',
          'primary-fg': 'rgb(var(--col-primary-fg) / <alpha-value>)',
          secondary:  'rgb(var(--col-secondary) / <alpha-value>)',
        },
        // Legacy aliases for compatibility
        primary: {
          DEFAULT: '#12100B',
          light: '#2a2620',
          dark: '#0a0806',
        },
        secondary: {
          DEFAULT: '#FBB823',
          light: '#ffc94d',
          dark: '#e5a51e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
