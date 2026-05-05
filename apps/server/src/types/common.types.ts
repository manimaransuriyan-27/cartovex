import { IUserDocument } from './user.types';
import { Request } from 'express';

export interface AuthenRequest extends Request {
  userId?: string;
  user?: IUserDocument;
}
