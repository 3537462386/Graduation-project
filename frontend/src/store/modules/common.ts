/*
 * @Author: L·W
 * @Date: 2024-03-29 14:40:48
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-30 18:03:14
 * @Description: Description
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CommonState {
  /** 添加好友弹窗 */
  addFriendVisible: boolean;
  /** 在线用户 */
  onlineUser: Set<string>;
}

const initialState = {
  addFriendVisible: false,
  onlineUser: new Set<string>()
} as CommonState;

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setAddFriendVisible: (state): void => {
      state.addFriendVisible = !state.addFriendVisible;
    },
    setOnlineUser: (state, action: PayloadAction<Set<string>>): void => {
      state.onlineUser = action.payload;
    }
  }
});
export const { setAddFriendVisible, setOnlineUser } = commonSlice.actions;
export default commonSlice.reducer;
