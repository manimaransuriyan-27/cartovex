import { Navbar } from '@/shared/components/Navbar';
import { Outlet } from 'react-router-dom';
// import { Sidebar } from '@/shared/components/Sidebar'
// import { CartDrawer } from '@/features/cart/components'
// import { Toast } from '@/shared/components/Toast'

export const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        {/* <Sidebar /> */}
        <main className="flex-1">
          <Outlet /> {/* page renders here */}
        </main>
      </div>
      {/* <CartDrawer />            global drawer, toggled via MobX */}
      {/* <Toast />                 global toast, triggered via MobX */}
    </div>
  );
};
