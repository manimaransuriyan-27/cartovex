// utils/issueAuthTokens.ts

import { Response } from 'express';
import crypto from 'crypto';
import { IUserDocument } from '../types';
import {
  generateAccessToken,
  generateRefreshToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from './tokens';

export const issueAuthTokens = async (
  user: IUserDocument,
  res: Response,
  statusCode = 200,
  message = 'Authentication successful',
) => {
  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  // 2. Hash refresh token before saving (IMPORTANT 🔐)
  const hashedRefreshToken = crypto
    .createHash('sha256')
    .update(refreshToken)
    .digest('hex');

  user.refreshToken = hashedRefreshToken;

  await user.save();

  // Access Token Cookie
  setAccessTokenCookie(res, accessToken);

  // Refresh Token Cookie (scoped)
  setRefreshTokenCookie(res, refreshToken);

  // 4. Send safe response (NO TOKENS)
  return res.status(statusCode).json({
    success: true,
    message,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};
