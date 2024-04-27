/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: L·W
 * @Date: 2024-04-12 15:50:19
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-26 17:14:18
 * @Description: Description
 */
import { request } from '@/utils/axios';
/**
 * dashbpard
 * @returns
 */
interface resState {
  code?: number;
  msg?: string;
  data?: any;
}
export const userLogin = async (data: any): Promise<resState> => {
  return request.post('/user/login', data);
};
export const userRegister = async (data: any): Promise<resState> => {
  return request.post('/user/register', data);
};
export const userGetAvatar = async (data: any): Promise<resState> => {
  return request.post('/user/getAvatar', data);
};
export const getUser = async (data: any): Promise<resState> => {
  return request.post('/user/getUser', data);
};
export const getGroup = async (data: any): Promise<resState> => {
  return request.post('/group/getGroup', data);
};
export const addUser = async (data: any): Promise<resState> => {
  return request.post('/user/addUser', data);
};
export const getFriends = async (data: any): Promise<resState> => {
  return request.post('/user/getFriends', data);
};
