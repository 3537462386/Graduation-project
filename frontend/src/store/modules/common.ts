/*
 * @Author: L·W
 * @Date: 2024-03-29 14:40:48
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-30 20:00:33
 * @Description: Description
 */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CommonState {
  /** 添加好友弹窗 */
  addFriendVisible: boolean;
  /** 创建群组弹窗 */
  createGroupVisible: boolean;
  /** 修改资料弹窗 */
  changeInfoVisible: boolean;
  /** 发表朋友圈 */
  createTextVisible: boolean;
  /** 连接状态 */
  connectVisible: boolean;
  /** 连接方式 */
  connectStyle: string;
}

const initialState = {
  addFriendVisible: false,
  createGroupVisible: false,
  changeInfoVisible: false,
  createTextVisible: false,
  connectVisible: false,
  connectStyle: 'N/A'
} as CommonState;

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setAddFriendVisible: (state): void => {
      state.addFriendVisible = !state.addFriendVisible;
    },
    setCreateGroupVisible: (state): void => {
      state.createGroupVisible = !state.createGroupVisible;
    },
    setChangeInfoVisible: (state): void => {
      state.changeInfoVisible = !state.changeInfoVisible;
    },
    setCreateTextVisible: (state): void => {
      state.createTextVisible = !state.createTextVisible;
    },
    setConnectVisible: (state, action: PayloadAction<boolean>): void => {
      state.connectVisible = action.payload;
    },
    setConnectStyle: (state, action: PayloadAction<string>): void => {
      state.connectStyle = action.payload;
    }
  }
});
export const {
  setAddFriendVisible,
  setCreateGroupVisible,
  setChangeInfoVisible,
  setCreateTextVisible,
  setConnectVisible,
  setConnectStyle
} = commonSlice.actions;
export default commonSlice.reducer;
