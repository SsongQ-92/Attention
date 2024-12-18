import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

const createPxEntries = (size: number) => {
  const entries: Record<string, string> = { 0: '0' };

  for (let i = 1; i <= size; i++) {
    entries[`${i}`] = `${i / 16}rem`;
  }

  return entries;
};

const PX_ENTRIES_10 = createPxEntries(10);
const PX_ENTRIES_100 = createPxEntries(100);
const PX_ENTRIES_1000 = createPxEntries(1000);

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    borderWidth: PX_ENTRIES_10,
    fontSize: PX_ENTRIES_100,
    spacing: PX_ENTRIES_1000,
    extend: {
      colors: {
        customBlack: {
          DEFAULT: 'rgb(24, 24, 27)',
        },
        backgroundColor: {
          hover: 'rgb(244, 244, 245)',
          darkHover: 'rgba(24, 24, 27, 0.8)',
        },
        borderColor: {
          DEFAULT: 'rgb(228, 228, 231)',
        },
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
      zIndex: {
        toolTip: '9000',
        annotation: '9999',
      },
    },
  },
  plugins: [typography],
};

export default config;
