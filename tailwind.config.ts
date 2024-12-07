import type { Config } from 'tailwindcss';

const createPxEntries = (size: number) => {
  const entries: Record<string, string> = { 0: '0' };

  for (let i = 1; i <= size; i++) {
    entries[`${i}`] = `${i / 16}rem`;
  }

  return entries;
};

const PX_ENTRIES_10 = createPxEntries(10);
const PX_ENTRIES_200 = createPxEntries(200);
const PX_ENTRIES_1000 = createPxEntries(1000);

const config: Config = {
  darkMode: 'media',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    borderWidth: PX_ENTRIES_10,
    fontSize: PX_ENTRIES_200,
    spacing: PX_ENTRIES_1000,
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
