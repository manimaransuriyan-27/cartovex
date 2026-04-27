import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined in environment variables');
    }
    const conn = await mongoose.connect(process.env.DATABASE_URL);
    console.log(`Database Connected : ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to database : ${error}`);
    process.exit(1);
  }
};

export default connectDB;
