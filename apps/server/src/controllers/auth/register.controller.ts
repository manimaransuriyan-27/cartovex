import { Request, Response } from 'express';
import { User } from '../../models/user.model';
import { generateToken } from '../../utils/token';

const registerUserController = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  try {
    if (!email || !name || !password) {
      return res.status(400).json({
        message: 'Please provide all required fields',
      });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const user = await User.create({
      email,
      name,
      password,
    });

    const token = generateToken(user._id.toString());

    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      token,
      success: true,
      message: 'User registered successfully',
    });
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
  }
};

const registerAdminController = async (req: Request, res: Response) => {
  const { name, email, password, secretKey } = req.body;

  try {
    if (secretKey !== process.env.ADMIN_REGISTRATION_SECRET) {
      return res.status(403).json({
        success: false,
        message: 'Invalid Secret Key. You cannot register as an admin.',
      });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const admin = await User.create({
      email,
      name,
      password,
      role: 'admin',
    });

    const token = generateToken(admin._id.toString());

    res.status(201).json({
      id: admin._id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      token,
      success: true,
      message: 'Admin registered successfully',
    });
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
  }
};

export { registerUserController, registerAdminController };
