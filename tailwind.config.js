/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5BC4E5',
        'primary-dark': '#3AAFD4',
        success: '#6DD98C',
        'success-dark': '#4EC870',
        soft: '#F0F8FF',
        card: '#FFFFFF',
        muted: '#F5F5F5',
        text: '#2D3748',
        'text-light': '#718096',
        warning: '#F6C344',
        danger: '#F87171',
        purple: '#B794F4',
        peach: '#FBB6A0',
      },
      fontFamily: {
        rounded: ['"Nunito"', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
