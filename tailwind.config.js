/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/*.{html,css,js,jsx}', './src/**/*.{html,css,js,jsx}'],
    theme: {
        extend: {
            width: {
                '95': '97%',
            }
        }
    },
    plugins: [],
}