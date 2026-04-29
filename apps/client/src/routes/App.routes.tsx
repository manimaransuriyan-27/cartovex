import { createBrowserRouter, redirect } from 'react-router-dom';

const appRouter = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const module = await import('../pages/Home');
      return { Component: module.default };
    },
  },
  {
    path: '/auth',
    lazy: async () => {
      const module = await import('../components/layout/AuthLayout');
      return { Component: module.default };
    },
    children: [
      {
        index: true,
        loader: () => redirect('/auth/login'),
      },
      {
        path: 'login',
        lazy: async () => {
          const module = await import('../pages/auth/Login');
          return { Component: module.default };
        },
      },
      {
        path: 'register',
        lazy: async () => {
          const module = await import('../pages/auth/Register');
          return { Component: module.default };
        },
      },
      {
        path: 'forgot-password',
        lazy: async () => {
          const module = await import('../pages/auth/ForgotPassword');
          return { Component: module.default };
        },
      },
    ],
  },
  {
    path: '*',
    lazy: async () => {
      const module = await import('../pages/NotFoundPage');
      return { Component: module.default };
    },
  },
]);

export default appRouter;
