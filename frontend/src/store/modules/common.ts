/*
 * @Author: L·W
 * @Date: 2024-03-29 14:40:48
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-26 15:26:13
 * @Description: Description
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserStateType {
  username: number;
  name: string;
  avatar: string;
  userId: string;
}

export interface CommonState {
  /** 用户信息 */
  userInfo: UserStateType;
  /** 添加好友弹窗 */
  addFriendVisible: boolean;
}

const initialState = { userInfo: {} } as CommonState;

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserStateType>): void => {
      state.userInfo = action.payload;
    },
    setAddFriendVisible: (state): void => {
      state.addFriendVisible = !state.addFriendVisible;
    }
  }
});
export const { setUserInfo, setAddFriendVisible } = commonSlice.actions;
export default commonSlice.reducer;
