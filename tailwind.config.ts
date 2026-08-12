import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'saffron-gold': '#C8781E',
        'aged-parchment': '#EDE1C4',
        'ink-brown': '#2A2015',
        'char-umbra': '#16110B',
        'thread-vermilion': '#A63A2C',
        'dust-gold': '#E8B857',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-newsreader)', 'serif'],
        ui: ['var(--font-space-grotesk)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
