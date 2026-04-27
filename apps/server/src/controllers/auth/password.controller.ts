import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { Request, Response } from 'express';
import { User } from '../../models/user.model';

// ─── Mailtrap Transporter ─────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: Number(process.env.MAILTRAP_PORT),
  secure: false,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

// ─── POST /api/v1/forgot-password ──────────────────────────────────────────
export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    // 1. Find the user
    const user = await User.findOne({ email });
    if (!user) {
      // Return generic message to avoid user enumeration
      return res.status(200).json({
        message: 'If that email exists, a reset link has been sent.',
      });
    }

    // 2. Generate a secure token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // 3. Hash and store the token (never store plain token in DB)
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();

    // 4. Build the reset URL (sent in email with plain token)
    const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    // 5. Send email via Mailtrap
    const mailOptions = {
      from: `"Cartovex Support" <no-reply@cartovexsupport.com>`,
      to: user.email,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          <h2>Password Reset</h2>
          <p>Hi ${user.name || 'there'},</p>
          <p>You requested a password reset. Click the button below to set a new password.</p>
          <p>This link will expire in <strong>1 hour</strong>.</p>
          <a
            href="${resetURL}"
            style="
              display: inline-block;
              padding: 12px 24px;
              background-color: #4F46E5;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              margin: 16px 0;
            "
          >
            Reset Password
          </a>
          <p>If you didn't request this, you can safely ignore this email.</p>
          <hr/>
          <small>MyApp &copy; ${new Date().getFullYear()}</small>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: 'If that email exists, a reset link has been sent.',
    });
  } catch (error) {
    console.error('forgotPassword error:', error);
    return res.status(500).json({ message: 'Internal server error.' + error });
  }
};

// ─── POST /api/v1/reset-password/:token ─────────────────────────────────────
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters.' });
    }

    // 1. Hash the incoming token to compare with DB
    const hashedToken = crypto
      .createHash('sha256')
      .update(token.toString())
      .digest('hex');

    // 2. Find user with matching token that hasn't expired
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    console.log('Token from URL:', token, user);
    console.log('Hashed version of URL token:', hashedToken);

    if (!user) {
      return res.status(400).json({ message: 'Token is invalid or has expired.' });
    }

    // 3. Update password (assumes pre-save hook hashes it, else hash manually)
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return res.status(200).json({ message: 'Password reset successfully.' });
  } catch (error) {
    console.error('resetPassword error:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
