/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        // colors: {
        //   japapurple: '#5922A9',

        // },
        extend: {
            backgroundImage: {
                // 'gradient': 'linear-gradient(180deg, #FBD5EF 0%, #FFFFFF 100%), linear-gradient(0deg, #FFFFFF, #FFFFFF)',
            },
        },

        fontFamily: {
            popins: ['Poppins', 'sans-serif'],
            sand: [' Quicksand', 'sans-serif'],
            pacific: ['Pacifico', 'cursive']
        }
    },
    plugins: [],
}