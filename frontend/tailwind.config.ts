import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#FAF9F6",
        ink: "#202522",
        teal: "#2F766D",
        amber: "#A86A13",
        warning: "#B42318",
        border: "#DDDAD4",
      },
    },
  },
  plugins: [],
} satisfies Config;

