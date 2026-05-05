import { useAuthStore } from '@/features/auth';
import { observer } from 'mobx-react-lite';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoute = observer(() => {
  const auth = useAuthStore();
  const location = useLocation();

  // Still booting — render nothing until session is confirmed
  if (auth.isInitializing) return null;

  if (!auth.isAuthenticated) {
    return (
      <Navigate
        to={`/login?returnUrl=${encodeURIComponent(location.pathname + location.search)}`}
        replace
      />
    );
  }
  return <Outlet />;
});
