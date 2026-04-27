import { Request, Response } from 'express';
import crypto from 'crypto';
import { User } from '../../models/user.model';

// @desc    Reset Password
// @route   PUT /api/v1/auth/reset-password/:token
export const resetPasswordController = async (req: Request, res: Response) => {
  // 1. Hash the token from URL to match the one in DB
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token[0])
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ message: 'Token is invalid or expired' });

  // 2. Set new password
  user.password = req.body.password;
  user.passwordResetToken;
  user.passwordResetExpires;
  await user.save();

  res.status(200).json({ message: 'Password updated successfully' });
};
