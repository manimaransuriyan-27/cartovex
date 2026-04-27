import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import connectDB from './config/db';
import adminRoutes from './routes/admin.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

connectDB();

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
);

app.use(express.json());

app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/users', userRoutes);

app.use('/api/v1/admin', adminRoutes);

export default app;
