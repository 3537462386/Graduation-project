/*
 * @Author: L·W
 * @Date: 2024-03-18 13:38:07
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-25 16:14:14
 * @Description: Description
 */
// import { useState } from "react";
import './App.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RouterProvider } from 'react-router-dom';
// import { ConfigProvider } from "antd";
import router from './router';
import { persistor, store } from '@/store/index.ts';
// import { ActionDiv } from './components/actionDiv.tsx';
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <ConfigProvider locale={enUS}> */}
        <div className="w-default-width h-default-height absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border-dark-900 border-solid">
          <RouterProvider router={router} />
        </div>
        {/* </ConfigProvider> */}
      </PersistGate>
    </Provider>
  );
}

export default App;
