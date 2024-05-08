/*
 * @Author: L·W
 * @Date: 2024-03-18 13:38:07
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-08 15:15:42
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
    <App className="w-100vw h-screen overflow-hidden bg-[url('/static/win.jpg')] bg-cover bg-no-repeat bg-center">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Apps />
          {/* <div className="w-100vw h-screen bg-[url('/static/win.jpg')] bg-cover bg-no-repeat bg-center"></div> */}
        </PersistGate>
      </Provider>
    </App>
  </React.StrictMode>
);
