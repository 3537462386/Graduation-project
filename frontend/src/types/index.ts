/*
 * @Author: L·W
 * @Date: 2024-04-26 18:06:11
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-26 18:07:46
 * @Description: Description
 */
export interface UserType {
  _id?: string;
  username?: string;
  password?: string;
  name?: string;
  avatar?: string;
  friends?: string[];
}
export interface GroupType {
  _id?: string;
  username?: string;
  name?: string;
  avatar?: string;
  users?: string[];
}
