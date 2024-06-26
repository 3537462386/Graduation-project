/*
 * @Author: L·W
 * @Date: 2024-03-28 14:31:24
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-10 16:41:19
 * @Description: Description
 */
import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers
} from '@reduxjs/toolkit';
import commonSlice from './modules/common';
import userSlice from './modules/user';
import onlineUserSlice from './modules/onlineUser';
import nowFocusSlice from './modules/nowFocus';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import titleSlice from './modules/title';
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userSlice', 'onlineUserSlice']
};

const reducer = combineReducers({
  commonSlice,
  userSlice,
  nowFocusSlice,
  onlineUserSlice
});

// 创建持久化Reducer
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

// 创建持久化存储
const persistor = persistStore(store);

export { store, persistor };
