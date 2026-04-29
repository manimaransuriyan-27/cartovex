import { NextFunction, Response } from 'express';
import { AuthRequest } from '../types';

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access only' });
  }
  next();
};
