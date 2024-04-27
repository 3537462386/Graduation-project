/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: L·W
 * @Date: 2024-03-18 13:38:07
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-27 14:58:19
 * @Description: Description
 */
import './App.css';
import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
// import { ConfigProvider } from "antd";
import router from './router';
import { AddFriend } from './components/addFriend';
// import { ActionDiv } from './components/actionDiv.tsx';
function App() {
  const addFriendVisible = useSelector(
    (state: any) => state.commonSlice.addFriendVisible
  );
  return (
    <>
      <div className="w-default-width h-default-height bg-white absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border border-solid border-[#e9e9e9] shadow-lg">
        <RouterProvider router={router} />
      </div>
      {addFriendVisible && <AddFriend />}
    </>
  );
}

export default App;
