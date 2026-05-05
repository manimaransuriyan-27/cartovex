import { IUser } from '@cartovex/types';
import mongoose from 'mongoose';

export interface IUserDocument extends Omit<IUser, '_id'>, mongoose.Document {
  password: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  refreshToken?: string;
  comparePassword(password: string): Promise<boolean>;
}
