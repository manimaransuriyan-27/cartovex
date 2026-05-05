import { UserRole, AddressLabel } from './common.types';

export type ID = string;
export interface IAddress<TId = ID> {
  _id: TId;
  label: AddressLabel;
  fullName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  phone: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}
export interface IUser<TId = ID> {
  _id: TId;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  addresses: IAddress<TId>[];
  isActive: boolean;
  createdAt: string;
}

// export interface IAuthUser<TId = ID> extends IUser<TId> {
//   token: string;
//   success: boolean;
//   message: string;
// }
