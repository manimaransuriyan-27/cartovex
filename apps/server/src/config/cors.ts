import cors from 'cors';
import { env } from './env';

const allowedOrigins =
  env.NODE_ENV === 'prod'
    ? ['https://cartovex.com']
    : ['http://localhost:9010', 'http://localhost:5173'];

export const corsOptions = cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
});
