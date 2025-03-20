import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bluegradient': 'linear-gradient(180deg, #618DB9 0%, #0E3151 100%)',
        'facturegradient': 'linear-gradient(80deg, #506F92 32%, #E1877D 100%)',
        'greengradient': 'linear-gradient(80deg, #FFD0CB 33%, #E1877D 94%)',
        "periodeGradient": "linear-gradient(180deg, #E1877D 0%, #FFE642 100%)",
        'progressBar': 'linear-gradient(180deg, #A5D8A8 0%, #5DF07E 29%, #FFE642 56%, #FAA317 85%, #FE3F14 98%)',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        deepBlue: "#294570",
        midnightblue: "#0E3151",
        cloudGray: "#F5F5F5",
        green: "#4BA668",
        whiteBlue: "#E1877D",
        whiteGreen: '#618DB9',
        periode: "#506F92"

      
      },
    },
  },
  plugins: [],
} satisfies Config;
