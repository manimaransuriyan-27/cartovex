// _id: user._id,
// name: user.name,
// email: user.email,
// role: user.role,
// token,
// success: true,
// message: 'Login successfully',

import type { IUser } from '@cartovex/types';

// export interface IUserDocument extends IUser<Types.ObjectId>, Document {

export interface AuthResponse extends IUser<string> {
  token: string;
  success: boolean;
  message: string;
}
