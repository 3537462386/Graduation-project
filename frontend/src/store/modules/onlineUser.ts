/*
 * @Author: L·W
 * @Date: 2024-05-10 16:38:20
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-10 16:41:11
 * @Description: Description
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OnlineUserType {
  /** 在线用户 */
  onlineUser: Set<string>;
}

const initialState: OnlineUserType = {
  onlineUser: new Set<string>()
};

const onlineUserSlice = createSlice({
  name: 'onlineUser',
  initialState,
  reducers: {
    setOnlineUser: (state, action: PayloadAction<Set<string>>): void => {
      state.onlineUser = action.payload;
    }
  }
});
export const { setOnlineUser } = onlineUserSlice.actions;
export default onlineUserSlice.reducer;
