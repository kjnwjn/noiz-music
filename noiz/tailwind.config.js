/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        screens: {
            tablet: "768px",
            // => @media (min-width: 640px) { ... }

            laptop: {
                min: "769px",
                max: "1200px",
            },
            // => @media (min-width: 1024px) { ... }

            desktop: {
                min: "1201px",
            },
            // => @media (min-width: 1280px) { ... }
        },
    },
    plugins: [],
    darkMode: "class",
};
