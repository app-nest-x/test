/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#3E2723', 
                    foreground: '#D7CCC8 ', 
                },
                
                muted: {
                    DEFAULT: 'hsl(42, 15%, 60%)', // Sandstone Beige
                    foreground: 'hsl(42, 15%, 85%)', // Light Sand
                },
                accent: {
                    DEFAULT: 'hsl(12, 80%, 55%)', // Vibrant Coral
                    
                },
                
                border: 'hsl(30, 15%, 70%)', // Soft Greyish Brown
               
            },
            
        },
    },
    
};
