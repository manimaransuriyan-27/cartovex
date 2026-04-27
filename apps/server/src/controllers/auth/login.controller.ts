import { Request, Response } from 'express';
import { User } from '../../models/user.model';
import { generateToken } from '../../utils/token';

const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: 'Please provide all required fields',
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials: User not found' });
    }

    if (user && (await user.comparePassword(password))) {
      const token = generateToken(user._id.toString());
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
        success: true,
        message: 'Login successfully',
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export { loginController };
