import express from 'express';
import helmet from 'helmet';
import connectDB from './config/db';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import cors from 'cors';

connectDB();

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use(express.json());

app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/users/', userRoutes);

export default app;
