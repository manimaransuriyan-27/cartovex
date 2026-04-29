import { Response } from 'express';
import { UserModel } from '../../models/user.model';
import { AuthRequest } from '../../types';

const MAX_ADDRESSES = 5;

const updateAddress = async (req: AuthRequest, res: Response) => {
  try {
    const user = await UserModel.findById(req.user?._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const address = user.addresses.find(
      (addr) => addr._id?.toString() === req.params.addressId,
    );

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    const { isDefault, ...rest } = req.body;

    if (isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
      address.isDefault = true;
    }

    Object.assign(address, rest);
    await user.save();

    res.status(201).json({ message: 'Address updated', addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
  }
};

const getAddresses = async (req: AuthRequest, res: Response) => {
  try {
    const user = await UserModel.findById(req.user?._id).select('addresses');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
  }
};

const addAddress = async (req: AuthRequest, res: Response) => {
  try {
    const user = await UserModel.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.addresses.length >= MAX_ADDRESSES) {
      return res
        .status(400)
        .json({ message: `You can only have up to ${MAX_ADDRESSES} addresses` });
    }
    const { isDefault, ...rest } = req.body;
    const makeDefault = isDefault || user.addresses.length === 0;

    if (makeDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
    }
    user.addresses.push({ ...rest, isDefault: makeDefault });
    await user.save();

    res.status(201).json({
      message: 'Address added successfully',
      addresses: user.addresses,
    });
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
  }
};

const deleteAddress = async (req: AuthRequest, res: Response) => {
  try {
    const user = await UserModel.findById(req.user?._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const address = user.addresses.find(
      (addr) => addr._id?.toString() === req.params.addressId,
    );

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    const wasDefault = address.isDefault;

    user.addresses = user.addresses.filter(
      (addr) => addr._id.toString() !== req.params.addressId,
    );

    if (wasDefault && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }

    await user.save();
    res.json({ message: 'Address deleted', addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
  }
};

const setDefaultAddress = async (req: AuthRequest, res: Response) => {
  try {
    const user = await UserModel.findById(req.user?._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const address = user.addresses.find(
      (addr) => addr._id?.toString() === req.params.addressId,
    );

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    user.addresses.forEach((addr) => (addr.isDefault = false));
    address.isDefault = true;

    await user.save();
    res.json({ message: 'Default address updated', addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
  }
};

export { addAddress, deleteAddress, getAddresses, setDefaultAddress, updateAddress };
