import { Spinner } from '@/shared/components';
import NotFoundPage from '@/shared/components/NotFoundPage';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { GuestRoute } from './Guest.Route';
import { AuthLayout } from './layout/AuthLayout';
import { RootLayout } from './layout/RootLayout';

const appRouter = createBrowserRouter([
  // ── Auth pages — standalone ──
  {
    element: <AuthLayout />,
    HydrateFallback: () => <Spinner className="min-h-screen" fullPage />,
    children: [
      {
        path: 'login',
        lazy: async () => {
          const module = await import('@/features/auth/pages/LoginPage');
          return { Component: module.default };
        },
        ErrorBoundary: () => {
          return <div>Error Login</div>;
        },
      },
      {
        path: 'register',
        lazy: async () => {
          const module = await import('@/features/auth/pages/RegisterPage');
          return { Component: module.default };
        },
      },
      {
        path: 'forgot-password',
        lazy: async () => {
          const module = await import('@/features/auth/pages/ForgotPasswordPage');
          return { Component: module.default };
        },
      },
    ],
  },

  // ── Main app ──
  {
    element: <RootLayout />,
    children: [
      {
        element: <GuestRoute />,
        HydrateFallback: () => <Spinner className="min-h-screen" />,
        children: [
          { index: true, element: <Navigate to="/products" replace /> },
          {
            path: 'products',
            lazy: async () => {
              const module = await import('@/features/catalog/pages/CatalogPage');
              return { Component: module.default };
            },
          },
          {
            path: 'products/:slug',
            lazy: async () => {
              const module = await import('@/features/catalog/pages/ProductDetailPage');
              return { Component: module.default };
            },
          },
          {
            path: 'search',
            lazy: async () => {
              const module = await import('@/features/catalog/pages/SearchResultsPage');
              return { Component: module.default };
            },
          },
          {
            path: 'category/:slug',
            lazy: async () => {
              const module = await import('@/features/catalog/pages/CatalogPage');
              return { Component: module.default };
            },
          },
        ],
      },
    ],
  },

  { path: '*', element: <NotFoundPage /> },
]);

export const AppRouter = () => {
  return <RouterProvider router={appRouter} />;
};

// await new Promise((res) => setTimeout(res, 200000))
