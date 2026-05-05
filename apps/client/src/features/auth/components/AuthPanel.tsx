import {
  CopyrightCircleOutlined,
  DingdingOutlined,
  ShoppingFilled,
  StarFilled,
  UserOutlined,
} from '@ant-design/icons';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const AuthPanel: React.FC = () => {
  const stats = [
    {
      value: '50K+',
      label: 'Products',
      icon: <ShoppingFilled className="text-blue-500 dark:text-blue-400" />,
    },
    {
      value: '2M+',
      label: 'Customers',
      icon: <UserOutlined className="text-purple-500 dark:text-purple-400" />,
    },
    {
      value: '4.9',
      label: 'Rating',
      icon: <StarFilled className="text-yellow-500 dark:text-yellow-400" />,
    },
  ];

  return (
    <>
      <div className="hidden lg:flex lg:w-[45%] bg-slate-50 dark:bg-[#0f0f0f] flex-col justify-between p-12 relative overflow-hidden transition-colors duration-500">
        {/* Background Pattern - Light: Gray dots | Dark: White dots */}
        <div
          className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, currentColor 1.5px, transparent 1.5px)`,
            backgroundSize: '32px 32px',
          }}
        />
        {/* Decorative Orbs - Adjusted opacity for Light mode */}
        <div className="absolute top-[20%] -left-[10%] w-72 h-72 bg-red-500/10 dark:bg-red-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[5%] w-64 h-64 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[100px]" />

        {/* Logo Section */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="p-">
            <DingdingOutlined className="text-[#F53838]" style={{ fontSize: 32 }} />
          </div>
          <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Carto
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 dark:from-red-500 dark:to-orange-400">
              vex
            </span>
          </span>
        </div>
        {/* Main Content */}
        <div className="relative z-10">
          <h2 className="text-5xl font-bold text-slate-900 dark:text-white leading-[1.1] mb-6">
            Elevate your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 dark:from-red-500 dark:to-orange-400">
              Shopping
            </span>{' '}
            experience.
          </h2>
          <p className="text-lg text-slate-600 dark:text-gray-400 max-w-md mb-10">
            Access a curated world of premium products with lightning-fast delivery and
            24/7 support.
          </p>

          {/* Stats Card - Light: White/Border | Dark: Glassmorphism */}
          <div className="grid grid-cols-3 gap-4 p-2 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none backdrop-blur-xl rounded-3xl">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center py-6 px-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/[0.05] transition-colors duration-300"
              >
                <div className="text-xl mb-2 opacity-90">{stat.icon}</div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">
                  {stat.value}
                </p>
                <p className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <div className="relative z-10 flex justify-between items-center text-xs text-slate-400 dark:text-gray-500 font-medium tracking-wide">
          <p>
            <CopyrightCircleOutlined /> {new Date().getFullYear()} CARTOVEX. All rights
            reserved.
          </p>
          <div className="flex gap-1 uppercase">
            <Link
              to="/terms"
              className="hover:text-slate-900 dark:hover:text-white transition-colors relative group"
            >
              terms
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <span>&</span>
            <Link
              to="/privacy"
              className="hover:text-slate-900 dark:hover:text-white transition-colors relative group"
            >
              privacy
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(AuthPanel);
