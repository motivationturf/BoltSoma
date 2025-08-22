import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  safelist: [
    // Blue/Purple/Pink
    'from-blue-600', 'via-purple-600', 'to-pink-600',
    'from-blue-50', 'via-purple-50', 'to-pink-50',
    'border-blue-300', 'text-blue-700', 'bg-blue-100',

    // Green/Emerald/Teal
    'from-green-600', 'via-emerald-600', 'to-teal-600',
    'from-green-50', 'via-emerald-50', 'to-teal-50',
    'border-green-300', 'text-green-700', 'bg-green-100',

    // Orange/Red/Pink
    'from-orange-600', 'via-red-600', 'to-pink-600',
    'from-orange-50', 'via-red-50', 'to-pink-50',
    'border-orange-300', 'text-orange-700', 'bg-orange-100',

    // Purple/Pink/Rose
    'from-purple-600', 'via-pink-600', 'to-rose-600',
    'from-purple-50', 'via-pink-50', 'to-rose-50',
    'border-purple-300', 'text-purple-700', 'bg-purple-100',

    // Cyan/Blue/Indigo
    'from-cyan-600', 'via-blue-600', 'to-indigo-600',
    'from-cyan-50', 'via-blue-50', 'to-indigo-50',
    'border-cyan-300', 'text-cyan-700', 'bg-cyan-100',

    // Indigo/Purple/Violet
    'from-indigo-600', 'via-purple-600', 'to-violet-600',
    'from-indigo-50', 'via-purple-50', 'to-violet-50',
    'border-indigo-300', 'text-indigo-700', 'bg-indigo-100',

    // Emerald/Green/Lime
    'from-emerald-600', 'via-green-600', 'to-lime-600',
    'from-emerald-50', 'via-green-50', 'to-lime-50',
    'border-emerald-300', 'text-emerald-700', 'bg-emerald-100',

    // Blue/Cyan/Teal
    'from-blue-600', 'via-cyan-600', 'to-teal-600',
    'from-blue-50', 'via-cyan-50', 'to-teal-50',
    'border-blue-300', 'text-blue-700', 'bg-blue-100',

    // Yellow/Orange/Red
    'from-yellow-600', 'via-orange-600', 'to-red-600',
    'from-yellow-50', 'via-orange-50', 'to-red-50',
    'border-yellow-300', 'text-yellow-700', 'bg-yellow-100',

    // Pink/Red/Yellow
    'from-pink-600', 'via-red-600', 'to-yellow-600',
    'from-pink-50', 'via-red-50', 'to-yellow-50',
    'border-pink-300', 'text-pink-700', 'bg-pink-100',

    // Green/Lime/Yellow
    'from-green-600', 'via-lime-600', 'to-yellow-600',
    'from-green-50', 'via-lime-50', 'to-yellow-50',

    // Violet/Purple/Fuchsia
    'from-violet-600', 'via-purple-600', 'to-fuchsia-600',
    'from-violet-50', 'via-purple-50', 'to-fuchsia-50',
    'border-violet-300', 'text-violet-700', 'bg-violet-100',

    // Amber/Orange/Red
    'from-amber-600', 'via-orange-600', 'to-red-600',
    'from-amber-50', 'via-orange-50', 'to-red-50',
    'border-amber-300', 'text-amber-700', 'bg-amber-100',
  ],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
