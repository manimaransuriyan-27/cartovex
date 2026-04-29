import { Request } from 'express';
import { Document, Types } from 'mongoose';
import { IUser } from '@cartovex/types';

export interface IUserDocument extends IUser<Types.ObjectId>, Document {
  password: string;
  comparePassword(password: string): Promise<boolean>;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

export interface AuthRequest extends Request {
  user?: IUserDocument;
}
