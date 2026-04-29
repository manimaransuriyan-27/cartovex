import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider } from 'antd';
import { createRoot } from 'react-dom/client';
import { antThemeToken } from '@cartovex/utils';
import { queryClient } from './lib/queryClient.ts';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={antThemeToken}>
        <App />
      </ConfigProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </>,
);
