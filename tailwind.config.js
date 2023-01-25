/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        test: {
          50: '#f5f6fa',
          100: '#ebecf4',
          200: '#d0d4e7',
          300: '#a6b0d3',
          400: '#7787bb',
          500: '#6476af',
          600: '#414f86',
          700: '#36406d',
          800: '#30385a',
          900: '#2c324e',
        },
      },
    },
    extend: {
      backgroundImage: (theme) => ({
        check: "url('/icons/check.svg')",
        landscape: "url('/images/landscape/2.jpg')",
      }),
    },
    screens: {
      md: '882px',
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
      inset: ['checked'],
      zIndex: ['hover', 'active'],
    },
  },
  plugins: [],
  future: {
    purgeLayersByDefault: true,
  },
};
