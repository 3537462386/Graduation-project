/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: L·W
 * @Date: 2024-04-26 18:06:11
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-18 19:51:57
 * @Description: Description
 */
export interface infoType {
  sign?: string;
  sex?: string;
  age?: string;
  birthday?: string;
}
export interface CommentType {
  username?: string;
  timestamp?: string;
  avatar?: string;
  comment?: string;
}
export interface UserType {
  _id?: string;
  username?: string;
  password?: string;
  name?: string;
  avatar?: string;
  friends?: string[];
  users?: string[];
  newMsg?: number;
  lastMsg?: any;
  info?: infoType;
}
export interface GroupType {
  _id?: string;
  username?: string;
  name?: string;
  avatar?: string;
  users?: string[];
  newMsg?: number;
  lastMsg?: any;
  info?: infoType;
}
export interface MsgType {
  _id?: string;
  to?: UserType;
  from?: UserType;
  content?: string;
  timestamp?: string;
}
export interface TextType {
  content: string;
  imgs: string[];
  timestamp: string;
  likes: string[];
  comments: CommentType[];
  name: string;
  avatar: string;
  _id: string;
  textId: string;
}
