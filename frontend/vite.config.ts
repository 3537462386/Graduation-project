/*
 * @Author: L·W
 * @Date: 2024-03-18 13:38:07
 * @LastEditors: L·W
 * @LastEditTime: 2024-03-28 15:10:11
 * @Description: Description
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
