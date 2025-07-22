import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      "quicksand": ["Quicksand", "Arial", "sans-serif"],
      "comfortaa": ["Comfortaa", "Arial", "sans-serif"],
      "baloo_2": ["'Baloo 2'", "Arial", "sans-serif"],
      "poppins": ["'Poppins'", "Arial", "sans-serif;"],
    },
    extend: {
      colors: {
        "emphasis": "#E93A7D",
        "neutral-100": "#EDEDED",
        "neutral-200": "#F7F7F7",
      },
      animation: {
        "slide-left": "slide-left-frame 0.4s ease normal",
        "slide-right": "slide-right-frame 0.4s ease normal",
        "slide-bottom": "slide-bottom-frame 0.4s ease normal",
        progress: "progress-frame ease normal",
      },
      keyframes: {
        "slide-left-frame": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-right-frame": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-bottom-frame": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "progress-frame": {
          from: {
            "--dot-progress": "0%",
          },
          to: {
            "--dot-progress": "100%",
          },
        },
      },
      backgroundImage: {
        "arrow_update":
          `url('data:image/svg+xml,<svg height="10px" width="10px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" xml:space="preserve" fill="%23fff" stroke="%23fff"><path style="fill:%23fff" d="M22 16c0 4.41-3.586 8-8 8s-8-3.59-8-8 3.586-8 8-8l2.359.027-1.164 1.164 2.828 2.828L24.035 6l-6.012-6-2.828 2.828L16.375 4H14C7.375 4 2 9.371 2 16s5.375 12 12 12 12-5.371 12-12h-4z"/></svg>')`,
      },
      rotate: {
        "360": "360deg",
      },
    },
  },
};
