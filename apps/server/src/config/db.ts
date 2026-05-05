import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined in environment variables');
    }
    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`Database Connected Successfully !`);
  } catch (error) {
    console.error(`Error connecting to database : ${error}`);
    process.exit(1);
  }
};

export default connectDB;
