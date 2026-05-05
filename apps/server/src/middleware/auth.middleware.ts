import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '@/config/env';
import { UserModel } from '@/models';
import { AuthenRequest } from '@/types';
import { AppError } from '@/utils';

export const authenticate = async (
  req: AuthenRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];

    if (!token) throw new AppError(401, 'Authentication required');

    let decoded: { userId: string };

    try {
      decoded = jwt.verify(token, env.JWT_ACCESS_SECRET!) as { userId: string };
    } catch (error) {
      throw new AppError(401, 'Invalid or expired access token');
    }

    const userId = decoded?.userId;

    if (!userId) throw new AppError(401, 'Invalid token payload');

    const user = await UserModel.findById(userId).select('-password').lean();

    if (!user) throw new AppError(401, 'User not found');
    if (!user.isActive) throw new AppError(403, 'Account is blocked');

    req.userId = userId;
    req.user = user;

    next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      return next(new AppError(401, 'Token expired'));
    }
    if (err.name === 'JsonWebTokenError') {
      return next(new AppError(401, 'Invalid token'));
    }
    next(err);
  }
};
