import { CloseOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/features/auth';
import AuthPanel from '@/features/auth/components/AuthPanel';
import { Spinner } from '@/shared/components';

export const AuthLayout = observer(() => {
  const auth = useAuthStore();

  if (!auth.isInitializing) return <Spinner className="min-h-screen" />;

  // Already logged in — bounce to home
  if (auth.isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen flex relative">
      <Link to="/" className="absolute top-8 right-8 z-50 p-2">
        <CloseOutlined className="text-sm text-slate-400 dark:text-slate-50" />
      </Link>

      <AuthPanel />
      <Outlet />
    </div>
  );
});

//  const auth = useAuthStore()
//   if (auth.isInitializing) return null
//   if (auth.isAuthenticated) return <Navigate to="/" replace />
//   return <Outlet />
