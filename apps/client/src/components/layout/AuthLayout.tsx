// layouts/AuthLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftPanel from './LeftPanel';

const AuthLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <LeftPanel />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
