/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: L·W
 * @Date: 2024-03-18 13:38:07
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-08 16:27:24
 * @Description: Description
 */
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
// import { ConfigProvider } from "antd";
import router from './router';
import { AddFriend } from './components/addFriend';
import { CreateGroup } from './components/createGroup';
import io from 'socket.io-client';
import { useEffect } from 'react';
import { setOnlineUser } from './store/modules/common';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
// import { ActionDiv } from './components/actionDiv.tsx';
function App() {
  const socket = io('http://localhost:4000');
  const dispatch = useDispatch();
  const addFriendVisible = useSelector(
    (state: any) => state.commonSlice.addFriendVisible
  );
  const createGroupVisible = useSelector(
    (state: any) => state.commonSlice.createGroupVisible
  );
  useEffect(() => {
    // 监听接收到消息事件
    socket.on('onlineUser', (data) => {
      dispatch(setOnlineUser(data));
    });
  }, [socket]);
  return (
    <>
      <ConfigProvider locale={zhCN}>
        <div className="w-default-width h-default-height bg-white absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border border-solid border-[#e9e9e9] shadow-lg">
          <RouterProvider router={router} />
        </div>
        {addFriendVisible && <AddFriend />}
        {createGroupVisible && <CreateGroup />}
      </ConfigProvider>
    </>
  );
}

export default App;
