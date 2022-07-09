/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                sblue: "#192734",
                swhite: "#fefefd",
                slgreen: "#c6e0cc",
            },
            width: {
                160: "40rem",
            },
            borderWidth: {
                1: "1px",
            },
        },
    },
    plugins: [],
};
