import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from "./db";

import authRoutes from './routes/auth';
import userRoutes from './routes/user';

const app = express();

connectDB();

app.use(morgan('tiny'));

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send(error.message);
})

app.use('/auth', authRoutes);

app.use('/user', userRoutes);

export default app;