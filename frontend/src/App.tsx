/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: L·W
 * @Date: 2024-03-18 13:38:07
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-30 20:02:17
 * @Description: Description
 */
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
// import { ConfigProvider } from "antd";
import router from './router';
import { AddFriend } from './components/addFriend';
import { CreateGroup } from './components/createGroup';
import { ChangeInfo } from './components/changeInfo';
import { CreateText } from './components/createText';
import io from 'socket.io-client';
import { useEffect } from 'react';
import { setOnlineUser } from './store/modules/onlineUser';
import { ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { setConnectStyle, setConnectVisible } from './store/modules/common';

dayjs.locale('zh-cn');
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
  const changeInfoVisible = useSelector(
    (state: any) => state.commonSlice.changeInfoVisible
  );
  const createTextVisible = useSelector(
    (state: any) => state.commonSlice.createTextVisible
  );
  const userInfo = useSelector((state: any) => state.userSlice);
  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }
    function onConnect() {
      dispatch(setConnectVisible(true));
      dispatch(setConnectStyle(socket.io.engine.transport.name));
      socket.io.engine.on('upgrade', (transport) => {
        dispatch(setConnectStyle(transport.name));
      });
      socket.emit('newJoin', userInfo?.userId);
    }
    function onDisconnect() {
      dispatch(setConnectVisible(false));
      dispatch(setConnectStyle('N/A'));
    }
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('onlineUser', (data) => {
      dispatch(setOnlineUser(data));
    });
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('onlineUser');
    };
  }, []);
  // useEffect(() => {
  //   // 监听接收到消息事件
  //   socket.on('onlineUser', (data) => {
  //     dispatch(setOnlineUser(data));
  //   });
  //   return () => {
  //     socket.off('onlineUser');
  //   };
  // }, []);
  // useEffect(() => {
  //   // 监听接收到消息事件
  //   socket.emit('newJoin', userInfo?.userId);
  // }, [socket]);
  return (
    <>
      <ConfigProvider locale={locale}>
        <div className="w-default-width h-default-height bg-white absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border border-solid border-gray-600 shadow-lg">
          <RouterProvider router={router} />
        </div>
        {addFriendVisible && <AddFriend />}
        {createGroupVisible && <CreateGroup />}
        {changeInfoVisible && <ChangeInfo />}
        {createTextVisible && <CreateText />}
      </ConfigProvider>
    </>
  );
}

export default App;
