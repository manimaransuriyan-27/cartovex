import { IAddress } from '@cartovex/types';
import bcrypt from 'bcryptjs';
import mongoose, { Schema } from 'mongoose';
import { IUserDocument } from '../types';

const addressSchema = new mongoose.Schema<IAddress>(
  {
    label: {
      type: String,
      enum: ['home', 'work', 'other'],
      default: 'home',
    },
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    addressLine1: { type: String, required: true, trim: true },
    addressLine2: { type: String, default: '' },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    pincode: { type: String, required: true, trim: true },
    country: { type: String, default: 'India' },
    isDefault: { type: Boolean, default: false },
  },
  { _id: true, timestamps: true },
);

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, default: '' },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    addresses: [addressSchema],
    isActive: { type: Boolean, default: true },
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },
  },
  { timestamps: true },
);

userSchema.pre<IUserDocument>('save', async function () {
  if (!this.isModified('password')) return;
  try {
    const salt = await bcrypt.genSalt(15);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    throw err;
  }
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model<IUserDocument>('User', userSchema);

export { UserModel };
