/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: L·W
 * @Date: 2024-04-26 18:06:11
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-05 13:44:50
 * @Description: Description
 */
export interface UserType {
  _id?: string;
  username?: string;
  password?: string;
  name?: string;
  avatar?: string;
  friends?: string[];
  newMsg?: number;
  lastMsg?: any;
}
export interface GroupType {
  _id?: string;
  username?: string;
  name?: string;
  avatar?: string;
  users?: string[];
  newMsg?: number;
  lastMsg?: any;
}
export interface MsgType {
  _id?: string;
  to?: UserType;
  from?: UserType;
  content?: string;
  timestamp?: string;
}
