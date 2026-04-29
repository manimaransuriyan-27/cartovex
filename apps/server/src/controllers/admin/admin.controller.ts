import { Request, Response } from 'express';
import { UserModel } from '../../models/user.model';
import { IUserDocument } from '../../types/user.types';

interface AuthRequest extends Request {
  user?: IUserDocument;
}

const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const { page = 1, limit = 20, search } = req.query;

    const filter: any = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [users, total] = await Promise.all([
      UserModel.find(filter)
        .select('-password')
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 }),
      UserModel.countDocuments(filter),
    ]);

    return res.status(200).json({
      users,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getUserById = async (req: AuthRequest, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
  }
};

export const blockUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.role === 'admin') {
      return res.status(400).json({ message: 'Cannot block an admin user' });
    }

    user.isActive = !user.isActive;

    await user.save();

    res.json({
      message: user.isActive ? 'User unblocked' : 'User blocked',
      isActive: user.isActive,
    });
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.role === 'admin') {
      return res.status(400).json({ message: 'Cannot delete an admin user' });
    }

    await user.deleteOne();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
  }
};

// Dashboard controller

// const getDashboardStats = async (req: AuthRequest, res: Response) => {
//     try {
//      const [totalUsers, totalProducts, totalOrders, revenueResult] = await Promise.all([
//       User.countDocuments({ role: 'user' }),
//       Product.countDocuments({ isActive: true }),
//       Order.countDocuments(),
//       Order.aggregate([
//         { $match: { status: { $ne: 'cancelled' } } },
//         { $group: { _id: null, total: { $sum: '$totalPrice' } } },
//       ]),
//     ]);

//     const totalRevenue = revenueResult[0]?.total || 0;

//     res.json({ totalUsers, totalProducts, totalOrders, totalRevenue });

//     } catch (error) {
//         res.status(500).json({ message: `Server error: ${error}` });
//     }
// };

export { getAllUsers, getUserById };
