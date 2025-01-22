/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
   
  ],
  theme: {
    extend: {
      colors: {
        // Greens
        'mint': '#45C190',
        'dartmouth-green': '#116125',
        'hookers-green': '#4B705D',
        'light-green': '#94DD6C',
        'mindaro': '#BCEE85',
 
        // Blacks and darks
        'rich-black': '#0A1F23',
        'rich-black-2': '#091615',
        'black': '#000000',
 
        // Light tones
        'honeydew': '#CDE3D3',
        'mint-cream': '#F5FBF0',
 
        // Status colors
        'warning': '#FFA94D', // Warm warning color
        'ok': '#4DD8A3', // Cool OK color
      },
    },
  },
  plugins: [],
}

