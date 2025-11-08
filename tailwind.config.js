module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Premium dark theme colors
        "premium-dark": "#0f172a",
        "premium-darker": "#0a0e27",
        "premium-card": "#1a1f3a",
        "premium-card-hover": "#252d47",
      },
      backgroundImage: {
        // Premium gradients
        "gradient-premium": "linear-gradient(135deg, #3b82f6 0%, #a855f7 50%, #ec4899 100%)",
        "gradient-dark": "linear-gradient(135deg, #0f172a 0%, #1a1f3a 100%)",
        "gradient-card": "linear-gradient(135deg, rgba(26, 31, 58, 0.5) 0%, rgba(37, 45, 71, 0.5) 100%)",
        "gradient-glow": "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        // Premium shadows
        "glow-blue": "0 0 20px rgba(59, 130, 246, 0.5)",
        "glow-purple": "0 0 20px rgba(147, 51, 234, 0.5)",
        "glow-pink": "0 0 20px rgba(236, 72, 153, 0.5)",
        "premium": "0 20px 60px rgba(0, 0, 0, 0.3)",
        "premium-lg": "0 30px 80px rgba(0, 0, 0, 0.4)",
      },
      animation: {
        // Premium animations
        "gradient-shift": "gradient-shift 8s ease infinite",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};
