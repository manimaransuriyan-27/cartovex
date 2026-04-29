import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
import { AuthRequest } from '../types';

const authprotect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }
    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    const userId = decoded?.id;

    if (!userId || typeof userId !== 'string') {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    req.user = await UserModel.findById(userId).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export { authprotect };

// export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       token = req.headers.authorization.split(' ')[1];

//       const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

//       req.user = await User.findById(decoded.id).select('-password');

//       return next();
//     } catch (error) {
//       return res.status(401).json({ message: 'Not authorized, token failed' });
//     }
//   }

//   if (!token) {
//     return res.status(401).json({ message: 'Not authorized, no token' });
//   }
// };
