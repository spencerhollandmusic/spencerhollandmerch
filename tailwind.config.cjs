module.exports = {
  content: ["./app/**/*.{js,jsx}","./components/**/*.{js,jsx}","./data/**/*.{json,md}"],
  theme: {
    extend: {
      colors: { brand: { DEFAULT: "var(--color-brand)", accent: "var(--color-accent)", muted: "var(--color-muted)" } },
      borderRadius: { '2xl': '1.25rem' },
      boxShadow: { soft: "0 8px 30px rgba(0,0,0,0.06)" }
    },
  },
  plugins: [],
}