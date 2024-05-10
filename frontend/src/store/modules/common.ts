/*
 * @Author: L·W
 * @Date: 2024-03-29 14:40:48
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-10 16:38:56
 * @Description: Description
 */
import { createSlice } from '@reduxjs/toolkit';

export interface CommonState {
  /** 添加好友弹窗 */
  addFriendVisible: boolean;
  /** 创建群组弹窗 */
  createGroupVisible: boolean;
  /** 修改资料弹窗 */
  changeInfoVisible: boolean;
}

const initialState = {
  addFriendVisible: false,
  createGroupVisible: false,
  changeInfoVisible: false
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
    }
  }
});
export const {
  setAddFriendVisible,
  setCreateGroupVisible,
  setChangeInfoVisible
} = commonSlice.actions;
export default commonSlice.reducer;
