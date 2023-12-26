/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
            },
            colors: {
                // Primary Colors
                'main-bg': '#F5F5F5',
                'primary': '#FF4500',
                'text': '#333333',

                // Game Categories Colors
                'adventure': '#4CAF50',
                'strategy': '#FFC107',
                'puzzle': '#2196F3',
                'action': '#E91E63',
                'sports': '#FF5722',
                'rpg': '#9C27B0',
                'simulation': '#FF9800',
                'arcade': '#607D8B',
                'multiplayer': '#3F51B5',

                // Highlights and Accents
                'success': '#4CAF50',
                'warning': '#FFC107',
                'error': '#FF5722',
                'info': '#2196F3'
            }
        }
    },
    plugins: [require('tailwind-scrollbar'), require('tailwind-scrollbar-hide'),]
};

