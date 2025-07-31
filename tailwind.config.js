/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Cyberpunk theme colors
        neon: "#8A2BE2",
        "neon-light": "#9A4BF2",
        "neon-dark": "#7A1BD2",
        teal: "#00CED1",
        "teal-light": "#20DEE1",
        "teal-dark": "#00BEC1",
        flame: "#FF4500",
        "flame-light": "#FF6520",
        "flame-dark": "#DF3500",
        "cyber-gray": {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        neon: "0 0 10px #8A2BE2, 0 0 20px #8A2BE2, 0 0 30px #8A2BE2",
        "neon-sm": "0 0 5px #8A2BE2",
        "neon-lg": "0 0 15px #8A2BE2, 0 0 30px #8A2BE2, 0 0 45px #8A2BE2",
        teal: "0 0 10px #00CED1, 0 0 20px #00CED1",
        "teal-sm": "0 0 5px #00CED1",
        flame: "0 0 10px #FF4500, 0 0 20px #FF4500",
        "cyber-glow": "0 0 20px rgba(138, 43, 226, 0.3)",
      },
      backgroundImage: {
        noise:
          "url('data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E')",
        circuit:
          "url('data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 H90 V90 H10 Z' fill='none' stroke='%238A2BE2' stroke-width='0.5' opacity='0.3'/%3E%3Ccircle cx='10' cy='10' r='2' fill='%238A2BE2' opacity='0.5'/%3E%3Ccircle cx='90' cy='90' r='2' fill='%2300CED1' opacity='0.5'/%3E%3Cpath d='M10 50 H40 V90' fill='none' stroke='%2300CED1' stroke-width='0.5' opacity='0.3'/%3E%3Cpath d='M50 10 V40 H90' fill='none' stroke='%23FF4500' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E')",
        geometry:
          "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238A2BE2' fill-opacity='0.1'%3E%3Cpath d='M30 30l15-15v30l-15-15zm-15 0l15 15v-30l-15 15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        "cyber-grid":
          "linear-gradient(rgba(138, 43, 226, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(138, 43, 226, 0.1) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "20px 20px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-neon": {
          "0%, 100%": { boxShadow: "0 0 5px #8A2BE2" },
          "50%": { boxShadow: "0 0 20px #8A2BE2, 0 0 30px #8A2BE2" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "circuit-flow": {
          "0%": { strokeDashoffset: "100" },
          "100%": { strokeDashoffset: "0" },
        },
        "data-stream": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100vw)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-neon": "pulse-neon 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        "circuit-flow": "circuit-flow 3s linear infinite",
        "data-stream": "data-stream 8s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
