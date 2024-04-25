/*
 * @Author: L·W
 * @Date: 2024-03-18 13:38:07
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-10 17:07:48
 * @Description: Description
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import Apps from './App.tsx';
import { App } from 'antd';
import './index.css';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App className="w-100vw h-100vh overflow-hidden">
      <Apps />
    </App>
  </React.StrictMode>
);
