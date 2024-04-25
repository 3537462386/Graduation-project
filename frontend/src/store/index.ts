/*
 * @Author: L·W
 * @Date: 2024-03-28 14:31:24
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-25 16:16:48
 * @Description: Description
 */
import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers
} from '@reduxjs/toolkit';
import commonSlice from './modules/common';
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
  storage
};

const reducer = combineReducers({
  commonSlice
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