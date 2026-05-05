import { QueryProvider } from './QueryProvider';
import { StoreProvider } from './StoreProvider';
import { ThemeProvider } from './ThemeProvider';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <ThemeProvider>
        <QueryProvider>{children}</QueryProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};
