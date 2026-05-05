import { Response } from 'express';
import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: '15m',
  });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: '7d',
  });
};

export const setAccessTokenCookie = (res: Response, token: string): void => {
  res.cookie('accessToken', token, {
    httpOnly: true, // JS cannot access this cookie — XSS safe
    secure: process.env.NODE_ENV === 'prod', // HTTPS only in prod
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000, // 15 minutes in ms
  });
};

export const setRefreshTokenCookie = (res: Response, token: string): void => {
  res.cookie('refreshToken', token, {
    httpOnly: true, // JS cannot access this cookie — XSS safe
    secure: process.env.NODE_ENV === 'prod', // HTTPS only in prod
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
  });
};
