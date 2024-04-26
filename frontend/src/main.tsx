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
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistor, store } from '@/store/index.ts';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App className="w-100vw h-100vh overflow-hidden">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Apps />
        </PersistGate>
      </Provider>
    </App>
  </React.StrictMode>
);
