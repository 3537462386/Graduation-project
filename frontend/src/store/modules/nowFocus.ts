/*
 * @Author: L·W
 * @Date: 2024-05-06 15:28:22
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-06 15:44:56
 * @Description: Description
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const initialState: FocusType = {
  _id: '',
  username: '',
  name: ''
};
export interface FocusType {
  _id?: string;
  username?: string;
  name?: string;
}
const nowFocusSlice = createSlice({
  name: 'nowFocus',
  initialState,
  reducers: {
    setNowFocus: (state, action: PayloadAction<FocusType>): void => {
      state.username = action.payload.username;
      state.name = action.payload.name;
      state._id = action.payload._id;
    }
  }
});
export const { setNowFocus } = nowFocusSlice.actions;
export default nowFocusSlice.reducer;
