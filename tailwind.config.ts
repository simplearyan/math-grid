import type { Config } from "tailwindcss";

const config: Config = {
  // ...existing config...
  plugins: [require("@tailwindcss/typography")],
};

export default config;