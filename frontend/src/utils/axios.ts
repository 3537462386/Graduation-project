/*
 * @Author: SYN
 * @Date: 2023-12-14 16:44:37
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-24 16:01:57
 * @Description:
 */

// import { router } from '@/router';
// import { getLanguage } from '@/utils';
// import { ut_getLS, ut_setLS } from '@bsnbase/utils';
// import axios, { type AxiosRequestConfig } from 'axios';
// // import errorCode from '@/locales/error-code/error-code.json';

// let reqNum = 0;
// const pending: Map<string, () => void> = new Map();
// const delPending = (config: AxiosRequestConfig<unknown>) => {
//   const configUrl =
//     config.url + (config.data ? JSON.stringify(config.data) : '');
//   pending.delete(configUrl);
// };

// const instance = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL,
//   timeout: 120 * 1000,
//   withCredentials: true,
//   headers: {
//     'content-type': 'application/json',
//     'x-requested-with': 'XMLHttpRequest',
//     'x-frame-options': 'SAMEORIGIN',
//     'X-Content-Type-Options': 'nosniff',
//     token: ''
//   }
// });

// instance.interceptors.request.use(
//   (config) => {
//     if (reqNum === 0) {
//       console.log('First request');
//     }
//     const configUrl =
//       config.url + (config.data ? JSON.stringify(config.data) : '');

//     if (pending.has(configUrl)) {
//       reqNum--;
//       pending.get(configUrl)?.();
//     }
//     reqNum++;

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// instance.interceptors.response.use(
//   async (response) => {
//     delPending(response.config);
//     reqNum--;
//     if (reqNum <= 0) {
//       // toast.handler && toast.handler.close();
//     }
//     if (import.meta.env.VITE_MOCK === 'MOCK') {
//       response.data.code = 0;
//       return response;
//     }
//     return response;
//   },
//   (error) => {
//     console.log(error);
//     if (error.message === 'canceled')
//       return {
//         data: {
//           code: '1',
//           data: undefined,
//           message: 'canceled'
//         }
//       };

//     if (error.response) {
//       delPending(error.response.config);
//     }

//     reqNum--;
//     if (reqNum <= 0) {
//       console.log('Last callback Error');
//     }

//     return {
//       status: error.response.request.status,
//       data: {
//         code: '-1',
//         data: undefined,
//         error
//       }
//     };
//   }
// );

// export const request = instance;
// export const axiosRequest = instance;

import axios from 'axios';
// axios配置
axios.defaults.baseURL = 'http://localhost:3000';
axios.interceptors.response.use((res) => {
  return res.data;
});

export const request = axios;
