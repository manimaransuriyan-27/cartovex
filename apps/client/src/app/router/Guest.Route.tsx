import { Outlet } from 'react-router-dom';

/**
 * No UI rendered. No redirect logic.
 * Marks routes that are intentionally public (catalog, search, product detail).
 * Guests and authenticated users alike pass through.
 */
export const GuestRoute = () => <Outlet />;
