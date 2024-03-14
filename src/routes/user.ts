import express, { Request, Response } from 'express';
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.get('/profile', authenticate, (req: Request | any, res: Response) => {
  res.json({ message: `Welcome ${req.user.username}` });
});

export default router;