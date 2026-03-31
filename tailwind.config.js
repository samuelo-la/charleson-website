/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./assets/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        teal: {
          50: "#e8f5f5",
          100: "#c6e8e8",
          600: "#108080",
          700: "#0d6e6e",
          800: "#0a5a5a"
        },
        mint: {
          50: "#f5fff5",
          100: "#e9ffe9",
          300: "#c8ffc8",
          400: "#b2ffb2",
          500: "#98ff98"
        },
        black: {
          50: "#eceeee",
          100: "#ced4d4",
          500: "#465252",
          700: "#1f2a2a",
          900: "#080c0c"
        },
        card: "#111d1d",
        "text-body": "#ffffff",
        "text-muted": "#98ff98",
        charcoal: "#080c0c"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, rgba(13,110,110,0.22) 0%, rgba(62,207,178,0.24) 58%, rgba(8,12,12,0.28) 100%)",
        "soft-radial": "radial-gradient(circle at 20% 20%, rgba(13,110,110,0.20) 0%, rgba(62,207,178,0.10) 35%, rgba(8,12,12,0) 65%)"
      },
      boxShadow: {
        soft: "0 18px 45px -28px rgba(10, 10, 10, 0.35)"
      }
    }
  },
  plugins: []
};
