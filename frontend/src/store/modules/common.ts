/*
 * @Author: L·W
 * @Date: 2024-03-29 14:40:48
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-08 17:27:09
 * @Description: Description
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CommonState {
  /** 添加好友弹窗 */
  addFriendVisible: boolean;
  /** 创建群组弹窗 */
  createGroupVisible: boolean;
  /** 在线用户 */
  onlineUser: Set<string>;
}

const initialState = {
  addFriendVisible: false,
  createGroupVisible: false,
  onlineUser: new Set<string>()
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
    setOnlineUser: (state, action: PayloadAction<Set<string>>): void => {
      state.onlineUser = action.payload;
    }
  }
});
export const { setAddFriendVisible, setOnlineUser, setCreateGroupVisible } =
  commonSlice.actions;
export default commonSlice.reducer;
