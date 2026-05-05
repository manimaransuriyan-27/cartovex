import { useAuthStore } from '@/features/auth';
import { Spinner } from '@/shared/components';
import { observer } from 'mobx-react-lite';
import { AppRouter } from './router';

export const App = observer(() => {
  const auth = useAuthStore();
  if (!auth.isInitializing) return <Spinner className="min-h-screen" />;

  return <AppRouter />;
});
