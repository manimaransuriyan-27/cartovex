// Roles (used by auth, admin, role middleware)
export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

export enum AddressLabel {
  HOME = 'home',
  WORK = 'work',
  OTHER = 'other',
}
// Order/product statuses (used by order + product modules)
export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DRAFT = 'draft',
}

export interface ApiResponse<T = null> {
  success: boolean;
  message?: string;
  data?: T;
}

// Pagination (used by product, order, user listing)
export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
}
