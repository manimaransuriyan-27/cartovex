import { AuthenRequest } from '@/types';
import { issueAuthTokens } from '@/utils';
import {
  loginSchema,
  refreshSchema,
  registerAdminSchema,
  registerSchema,
} from '@cartovex/validators';
import { NextFunction, Response } from 'express';
import { authService } from './auth.service';

export const authController = {
  login: async (req: AuthenRequest, res: Response, next: NextFunction) => {
    try {
      const dto = loginSchema.parse(req.body);
      const user = await authService.login(dto);
      return await issueAuthTokens(user, res, 200, 'Login successful');
    } catch (err) {
      next(err);
    }
  },

  register: async (req: AuthenRequest, res: Response, next: NextFunction) => {
    try {
      const dto = registerSchema.parse(req.body);
      const user = await authService.register(dto);
      return await issueAuthTokens(user, res, 201, 'User registered successfully');
    } catch (err) {
      next(err);
    }
  },

  registerAdmin: async (req: AuthenRequest, res: Response, next: NextFunction) => {
    try {
      const dto = registerAdminSchema.parse(req.body);
      const user = await authService.registerAdmin(dto);
      return await issueAuthTokens(user, res, 201, 'Admin registered successfully');
    } catch (err) {
      next(err);
    }
  },

  refresh: async (req: AuthenRequest, res: Response, next: NextFunction) => {
    try {
      const dto = refreshSchema.parse(req.cookies);
      const user = await authService.refresh(dto.refreshToken);
      return await issueAuthTokens(user, res, 200, 'Token refreshed successfully');
    } catch (err) {
      next(err);
    }
  },

  getMe: async (req: AuthenRequest, res: Response, next: NextFunction) => {
    try {
      const user = await authService.getMe(req.user!);
      return res.status(200).json({
        success: true,
        message: 'User fetched successfully',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};

// export const refreshController = async (req: Request, res: Response) => {
//   try {
//     const refreshToken = req.cookies?.refreshToken;

//     if (!refreshToken) {
//       return res.status(401).json({
//         success: false,
//         message: 'Refresh token missing',
//       });
//     }

//     const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as {
//       userId: string;
//     };

//     const userId = decoded?.userId;
//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid token payload',
//       });
//     }

//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: 'User not found',
//       });
//     }

//     if (!user.isActive) {
//       return res.status(403).json({
//         success: false,
//         message: 'Account is blocked',
//       });
//     }

//     const hashedToken = crypto.createHash('sha256').update(refreshToken).digest('hex');

//     if (user.refreshToken !== hashedToken) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid refresh token',
//       });
//     }

//     return await issueAuthTokens(user, res, 200, 'Token refreshed successfully');
//   } catch (error: any) {
//     if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
//       return res.status(401).json({
//         success: false,
//         message: 'Session expired, please login again',
//       });
//     }

//     console.error('Refresh Token Error:', error);

//     return res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//     });
//   }
// };
