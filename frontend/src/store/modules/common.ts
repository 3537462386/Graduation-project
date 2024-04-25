/*
 * @Author: L·W
 * @Date: 2024-03-29 14:40:48
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-25 15:04:51
 * @Description: Description
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserStateType {
  username: number;
  name: string;
  avatar: string;
}

export interface CommonState {
  /** 用户信息 */
  userInfo: UserStateType;
}

const initialState = { userInfo: {} } as CommonState;

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserStateType>): void => {
      state.userInfo = action.payload;
    }
  }
});
export const { setUserInfo } = commonSlice.actions;
export default commonSlice.reducer;
