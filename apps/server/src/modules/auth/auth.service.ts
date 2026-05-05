import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { env } from '@/config/env';
import { UserModel } from '@/models';
import { IUserDocument } from '@/types';
import { AppError } from '@/utils';
import { LoginDto, RegisterDto } from '@cartovex/validators';

export const authService = {
  // ─── Private helper — avoids duplicating findOne logic ───────────────────
  async _checkEmailTaken(email: string, errorMessage: string): Promise<void> {
    const existing = await UserModel.findOne({ email });
    if (existing) throw new AppError(409, errorMessage);
  },

  // ─── Register ─────────────────────────────────────────────────────────────
  async register(dto: RegisterDto): Promise<IUserDocument> {
    const email = dto.email.toLowerCase().trim();
    await authService._checkEmailTaken(email, 'User already exists');

    const user = await UserModel.create({
      email,
      name: dto.name.trim(),
      password: dto.password,
    });

    return user;
  },

  // ─── Register Admin ───────────────────────────────────────────────────────
  async registerAdmin(dto: RegisterDto & { secretKey: string }): Promise<IUserDocument> {
    if (dto.secretKey !== env.ADMIN_REGISTRATION_SECRET) {
      throw new AppError(403, 'Invalid admin secret key');
    }

    const email = dto.email.toLowerCase().trim();
    await authService._checkEmailTaken(email, 'Admin already exists');

    const admin = await UserModel.create({
      email,
      name: dto.name.trim(),
      password: dto.password,
      role: 'admin',
    });

    return admin;
  },

  // ─── Login ────────────────────────────────────────────────────────────────
  async login(dto: LoginDto): Promise<IUserDocument> {
    const email = dto.email.toLowerCase().trim();

    const user = await UserModel.findOne({ email }).select('+password');
    if (!user) throw new AppError(401, 'Invalid email or password');

    if (!user.isActive) throw new AppError(403, 'Account is blocked');

    const isMatch = await user.comparePassword(dto.password);
    if (!isMatch) throw new AppError(401, 'Invalid email or password');

    return user;
  },

  // ─── Get Me ───────────────────────────────────────────────────────────────
  async getMe(user: IUserDocument): Promise<IUserDocument> {
    if (!user) throw new AppError(401, 'Unauthorized');
    if (!user.isActive) throw new AppError(403, 'Account is blocked');
    return user;
  },

  // ─── Refresh Token (placeholder) ─────────────────────────────────────────
  async refresh(token: string): Promise<IUserDocument> {
    if (!token) throw new AppError(401, 'Refresh token missing');

    let decoded: { id: string };
    try {
      decoded = jwt.verify(token, env.JWT_REFRESH_SECRET!) as { id: string };
    } catch {
      throw new AppError(401, 'Invalid or expired refresh token');
    }

    const userId = decoded?.id;

    if (!userId) throw new AppError(401, 'Invalid token payload');

    const user = await UserModel.findById(userId).select('+refreshToken');

    if (!user) throw new AppError(401, 'User not found');
    if (!user.isActive) throw new AppError(403, 'Account is blocked');

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    if (user.refreshToken !== hashedToken) {
      throw new AppError(401, 'Invalid refresh token');
    }

    return user;
  },
};
