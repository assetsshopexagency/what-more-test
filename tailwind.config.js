/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#4A5895", // Purple gradient primary
        secondary: "#764ba2", // Purple gradient secondary
        success: "#10b981", // Green for checked items
        error: "#ef4444", // Red for close button hover
        background: {
          light: "#f8fafc",
          dark: "#0f172a",
        },
        card: {
          light: "#ffffff",
          dark: "#1e293b",
        },
        // Additional colors from your theme
        muted: {
          light: "#6b7280",
          dark: "#94a3b8",
        },
        border: {
          light: "#e2e8f0",
          dark: "#374151",
        },
      },
      animation: {
        "slide-in": "slideIn 0.3s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
        glow: "glow 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        slideIn: {
          from: { transform: "translateX(-100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(102, 126, 234, 0.4)" },
          "50%": { boxShadow: "0 0 30px rgba(102, 126, 234, 0.8)" },
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "gradient-light": "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        "gradient-dark": "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      },
    },
  },
  plugins: [],
};
