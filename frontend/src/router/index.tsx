/*
 * @Author: L·W
 * @Date: 2024-03-28 14:30:22
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-18 14:44:09
 * @Description: Description
 */
import { Home } from '@/layout/home';
import { createBrowserRouter, Outlet, Navigate } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Navigate to="login" />
      },
      {
        path: 'login',
        element: <Outlet />,
        children: [
          {
            index: true,
            async lazy() {
              const { Login } = await import('@/view/login');
              return { Component: Login };
            }
          }
        ]
      },
      {
        path: 'home',
        element: <Home />,
        children: [
          {
            index: true,
            element: <Navigate to="msg" />
          },
          {
            path: 'msg',
            element: <Outlet />,
            children: [
              {
                index: true,
                async lazy() {
                  const { Msg } = await import('@/view/msg');
                  return { Component: Msg };
                }
              }
            ]
          },
          {
            path: 'contacts',
            element: <Outlet />,
            children: [
              {
                index: true,
                async lazy() {
                  const { Contacts } = await import('@/view/contacts');
                  return { Component: Contacts };
                }
              }
            ]
          },
          {
            path: 'texts',
            element: <Outlet />,
            children: [
              {
                index: true,
                async lazy() {
                  const { Texts } = await import('@/view/texts');
                  return { Component: Texts };
                }
              }
            ]
          }
        ]
      }
    ]
  }
]);

export default router;
