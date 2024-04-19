import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        dep: "#38348c",
        depy: "#fbbb14",
      },
      textColor: {
        dep: "#38348c",
        depy: "#fbbb14",
      },
      borderColor: {
        dep: "#38348c",
      },
    },
  },
  plugins: [],
};
export default config;
