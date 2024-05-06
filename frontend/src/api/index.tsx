/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: L·W
 * @Date: 2024-04-12 15:50:19
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-02 14:15:56
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
export const getFriends = async (data: any): Promise<resState> => {
  return request.post('/user/getFriends', data);
};
export const getFriendsStatus = async (data: any): Promise<resState> => {
  return request.post('/user/getFriendsStatus', data);
};

export const getAllGroup = async (data: any): Promise<resState> => {
  return request.post('/group/getAllChatGroup', data);
};
export const getGroup = async (data: any): Promise<resState> => {
  return request.post('/group/getGroup', data);
};
export const addGroup = async (data: any): Promise<resState> => {
  return request.post('/group/addGroup', data);
};

export const newMsg = async (data: any): Promise<resState> => {
  return request.post('/msg/newMsg', data);
};
export const getMsg = async (data: any): Promise<resState> => {
  return request.post('/msg/getMsg', data);
};

export const sendReq = async (data: any): Promise<resState> => {
  return request.post('/friendReq/sendReq', data);
};
export const getFReq = async (data: any): Promise<resState> => {
  return request.post('/friendReq/getFReq', data);
};
export const dealReq = async (data: any): Promise<resState> => {
  return request.post('/friendReq/dealReq', data);
};
