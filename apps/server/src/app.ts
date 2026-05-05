import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { corsOptions } from '@/config/cors';
import { errorMiddleware } from '@/middleware/error.middleware';
import connectDB from './config/db';
import router from './routes';

connectDB();

const app = express();

app.use(corsOptions);

app.use(express.json());

app.use(helmet());

app.use(cookieParser());

app.use(express.json());

app.use('/api/v1', router);

app.use(errorMiddleware);

export default app;
