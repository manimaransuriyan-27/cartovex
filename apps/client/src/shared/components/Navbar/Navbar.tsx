import { useTheme } from '@/app/context';
import {
  AppstoreOutlined,
  CloseOutlined,
  DingdingOutlined,
  FireOutlined,
  MenuOutlined,
  MoonOutlined,
  SearchOutlined,
  ShoppingOutlined,
  SunOutlined,
  TagsOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { Drawer, Dropdown } from 'antd';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Shop', to: '/shop', icon: <AppstoreOutlined /> },
  { label: 'Categories', to: '/categories', icon: <TagsOutlined /> },
  { label: 'Deals', to: '/deals', icon: <ThunderboltOutlined /> },
  { label: 'New Arrivals', to: '/new-arrivals', icon: <FireOutlined /> },
];

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const location = useLocation();
  const searchRef = useRef<HTMLInputElement>(null);

  /* ── scroll listener ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── close mobile menu on route change ── */
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (to: string) => location.pathname === to;

  return (
    <>
      {/* ─────────────────────────────────────────
          NAVBAR
      ───────────────────────────────────────── */}
      <nav
        className={`
          sticky top-0 z-50 w-full transition-all duration-500
          ${
            scrolled
              ? 'border-b border-slate-200/60 dark:border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
              : 'border-b border-transparent'
          }
          bg-white/70 dark:bg-[#0f0f0f]/75
          backdrop-blur-2xl backdrop-saturate-150
        `}
        style={{
          WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
        }}
      >
        {/* subtle top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent opacity-0 dark:opacity-100 transition-opacity duration-500" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* ── LOGO ── */}
            <Link
              to="/"
              className="flex items-center gap-1 group shrink-0"
              aria-label="Cartovex Home"
            >
              {' '}
              <div className="p-">
                <DingdingOutlined className="text-[#F53838]" style={{ fontSize: 32 }} />
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Carto
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 dark:from-red-500 dark:to-orange-400">
                  vex
                </span>
              </span>
            </Link>

            {/* ── DESKTOP NAV LINKS ── */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className={`
                    relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
                    ${
                      isActive(to)
                        ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-white/[0.08]'
                        : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/[0.05]'
                    }
                  `}
                >
                  {label}
                  {/* active dot */}
                  {isActive(to) && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-500" />
                  )}
                </Link>
              ))}
            </div>

            {/* ── RIGHT SECTION ── */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop Search */}
              <div
                className={`
                  hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full border
                  transition-all duration-300 ease-in-out
                  ${
                    isSearchFocused
                      ? 'w-64 border-red-400/60 dark:border-red-500/40 bg-white dark:bg-zinc-900/80 shadow-[0_0_0_3px_rgba(245,56,56,0.12)]'
                      : 'w-48 border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40'
                  }
                `}
              >
                <SearchOutlined
                  className={`transition-colors duration-200 shrink-0 ${
                    isSearchFocused ? 'text-red-500' : 'text-slate-400'
                  }`}
                />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products…"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="bg-transparent border-none outline-none text-sm w-full text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 transition-colors"
                  >
                    <CloseOutlined style={{ fontSize: 11 }} />
                  </button>
                )}
              </div>

              {/* Mobile Search Toggle */}
              <button
                className="lg:hidden relative p-2.5 rounded-full text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all duration-200"
                onClick={() => setMobileSearchOpen((v) => !v)}
                aria-label="Toggle search"
              >
                {mobileSearchOpen ? (
                  <CloseOutlined style={{ fontSize: 16 }} />
                ) : (
                  <SearchOutlined style={{ fontSize: 16 }} />
                )}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="relative p-2.5"
                aria-label="Toggle theme"
              >
                <span
                  className="block transition-transform duration-300 cursor-pointer"
                  style={{
                    transform: theme !== 'dark' ? 'rotate(0deg)' : 'rotate(180deg)',
                  }}
                >
                  {theme !== 'light' ? (
                    <SunOutlined className="text-slate-100" />
                  ) : (
                    <MoonOutlined />
                  )}
                </span>
              </button>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2.5 rounded-full text-slate-500 dark:text-zinc-400 hover:text-slate-900"
                aria-label="Cart (3 items)"
              >
                <ShoppingOutlined
                  style={{ fontSize: 18 }}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5"
                />
                {/* badge */}
                <span className="absolute top-1 right-1 min-w-[16px] h-4 flex items-center justify-center bg-red-500 text-white text-[9px] font-bold px-1 rounded-full border-2 border-white dark:border-[#0f0f0f] shadow-sm transition-transform duration-200 group-hover:scale-110">
                  3
                </span>
              </Link>

              <Dropdown
                menu={{
                  items: [
                    { key: 'profile', label: <Link to="/profile">Profile</Link> },
                    { key: 'orders', label: <Link to="/orders">My Orders</Link> },
                    { type: 'divider' },
                    { key: 'logout', label: 'Logout', danger: true, onClick: () => {} },
                  ],
                }}
                placement="bottomRight"
                trigger={['click']}
              >
                {/* Avatar Circle */}
                <div
                  // className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
                  className="flex h-9 w-9 items-center justify-center text-sm font-semibold rounded-full
                    text-white overflow-hidden
                    bg-gradient-to-r from-red-600 to-red-500
                    hover:from-red-500 hover:to-orange-500
                    shadow-[0_2px_12px_rgba(245,56,56,0.35)]
                    hover:shadow-[0_4px_20px_rgba(245,56,56,0.5)]
                    transition-all duration-300
                    active:scale-95 cursor-pointer"
                  style={{ backgroundColor: '#F53838' }}
                >
                  {'M'}
                </div>
              </Dropdown>

              <Link to="/login" className="hidden sm:block">
                <button
                  className="
                    relative px-5 py-2 text-sm font-semibold rounded-full
                    text-white overflow-hidden
                    bg-gradient-to-r from-red-600 to-red-500
                    hover:from-red-500 hover:to-orange-500
                    shadow-[0_2px_12px_rgba(245,56,56,0.35)]
                    hover:shadow-[0_4px_20px_rgba(245,56,56,0.5)]
                    transition-all duration-300
                    active:scale-95 cursor-pointer
                  "
                >
                  <span className="relative z-10">Sign In</span>
                  {/* shine sweep */}
                  <span className="absolute inset-0 -translate-x-full hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />
                </button>
              </Link>

              {/* Mobile Hamburger */}
              <button
                className="md:hidden p-2.5 rounded-full text-slate-500 dark:text-zinc-400 hover:text-slate-900"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <MenuOutlined style={{ fontSize: 18 }} />
              </button>
            </div>
          </div>

          {/* ── MOBILE SEARCH BAR (slide-down) ── */}
          <div
            className={`
              lg:hidden overflow-hidden transition-all duration-300 ease-in-out
              ${mobileSearchOpen ? 'max-h-16 opacity-100 pb-3' : 'max-h-0 opacity-0'}
            `}
          >
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/60">
              <SearchOutlined className="text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products…"
                className="bg-transparent border-none outline-none text-sm w-full text-slate-900 dark:text-white placeholder:text-slate-400"
                autoFocus={mobileSearchOpen}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')}>
                  <CloseOutlined className="text-slate-400" style={{ fontSize: 11 }} />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ─────────────────────────────────────────
          MOBILE DRAWER
      ───────────────────────────────────────── */}
      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        placement="right"
        width={300}
        closeIcon={null}
        styles={{
          body: { padding: 0 },
          mask: { backdropFilter: 'blur(4px)' },
          content: {
            background: theme === 'dark' ? '#0f0f0f' : '#ffffff',
            borderLeft:
              theme === 'dark' ? '1px solid rgba(255,255,255,0.07)' : '1px solid #e2e8f0',
          },
        }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-white/[0.07]">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => setMobileOpen(false)}
          >
            <DingdingOutlined className="text-[#F53838]" style={{ fontSize: 26 }} />
            <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Carto
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
                vex
              </span>
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-full text-slate-400 dark:text-zinc-500 hover:text-slate-700 cursor-pointer"
          >
            <CloseOutlined style={{ fontSize: 14 }} />
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="px-4 py-6 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, to, icon }) => (
            <Link
              key={label}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                ${
                  isActive(to)
                    ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/[0.05]'
                }
              `}
            >
              <span
                className={`text-base ${isActive(to) ? 'text-red-500' : 'text-slate-400 dark:text-zinc-500'}`}
              >
                {icon}
              </span>
              {label}
              {isActive(to) && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-red-500" />
              )}
            </Link>
          ))}
        </nav>

        {/* Drawer Footer CTA */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-6 border-t border-slate-100 dark:border-white/[0.07]">
          <Link to="/auth/login" onClick={() => setMobileOpen(false)}>
            <button className="w-full py-3 px-6 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-orange-500 shadow-[0_4px_20px_rgba(245,56,56,0.4)] transition-all duration-300 active:scale-95">
              Sign In to Cartovex
            </button>
          </Link>
          <p className="mt-3 text-center text-xs text-slate-400 dark:text-zinc-600">
            New here?{' '}
            <Link
              to="/auth/register"
              onClick={() => setMobileOpen(false)}
              className="text-red-500 hover:text-red-600 font-medium"
            >
              Create an account
            </Link>
          </p>
        </div>
      </Drawer>
    </>
  );
};

export { Navbar };
