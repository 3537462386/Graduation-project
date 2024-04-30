/*
 * @Author: L·W
 * @Date: 2024-04-25 17:07:25
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-30 17:48:43
 * @Description: Description
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserStateType {
  username: string;
  name: string;
  avatar: string;
  userId: string;
}

const initialState: UserStateType = {
  username: '0',
  name: '',
  avatar: '',
  userId: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserStateType>): void => {
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.avatar = action.payload.avatar;
      state.userId = action.payload.userId;
    }
  }
});
export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
