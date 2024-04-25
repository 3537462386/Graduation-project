/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: L·W
 * @Date: 2024-04-12 15:50:19
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-25 11:25:20
 * @Description: Description
 */
import { request } from '@/utils/axios';
/**
 * dashbpard
 * @returns
 */
export const userLogin = async (data: any) => {
  return request.post('/user/login', data);
};
export const userRegister = async (data: any) => {
  return request.post('/user/register', data);
};
export const userGetAvatar = async (data: any) => {
  return request.post('/user/getAvatar', data);
};
