import { Document, Types } from 'mongoose';

export interface IAddress {
  _id: Types.ObjectId;
  label: 'home' | 'work' | 'other';
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

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  phone: string;
  addresses: IAddress[];
  isActive: Boolean;
  createdAt: string;
  comparePassword(password: string): Promise<boolean>;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}
