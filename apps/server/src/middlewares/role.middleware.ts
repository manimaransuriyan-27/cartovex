import { Request, Response, NextFunction } from 'express';

// This is a "middleware factory" - it returns a middleware function
export const authorize = (...roles: string[]) => {
  return (req: Request | any, res: Response, next: NextFunction) => {
    // Check if user exists and if their role is included in the allowed roles
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user?.role}' is not authorized to access this route`,
      });
    }
    next();
  };
};
