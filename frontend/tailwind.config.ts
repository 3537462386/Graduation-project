/*
 * @Author: L·W
 * @Date: 2024-03-28 15:18:32
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-29 16:48:46
 * @Description: Description
 */
import type { Config } from 'tailwindcss';

const spacing: Record<string, string> = {
  0: '0',
  '1/3h': '33.33vh',
  '2/3h': '66.66vh',
  '1/2h': '50vh'
};

const color: Record<string, string> = {
  'theme-bg': '#F5F6FA', // 背景色
  theme: '#4E75BF', // 主题色
  'theme-400': '#7CA2EA', // 副主题色
  'theme-200': '#E9F2FF' // 副主题色
};

for (let index = 4; index <= 1600; index += 1)
  spacing[index] = index / 4 + 'rem';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@bsnbase/components-react/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      screens: {
        xs: { max: '480px' },
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        xxl: '1600px',
        '2xl': '1600px'
      },
      spacing,
      maxWidth: spacing,
      maxHeight: spacing,
      minWidth: spacing,
      minHeight: spacing,
      color,
      backgroundColor: color,
      textColor: color,
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'login-bg': "url('/static/images/login-bg.svg')",
        'login-center-bg': "url('/static/images/login-center-bg.png')",
        'login-center-bg-svg': "url('/static/images/login-center-bg.svg')",
        'login-logo': "url('/static/images/login-logo.png')"
      },
      width: {
        'default-width': '1080px'
        // '1/3': '33.333333%'
        // 可以添加更多的宽度变量
      },
      height: {
        'default-height': '500px'
        // 'screen-1/2': '50vh'
        // 可以添加更多的高度变量
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
};
export default config;
