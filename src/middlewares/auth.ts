import { Request, Response, NextFunction } from 'express';

import jwt from "jsonwebtoken";
import { User } from "@/models";

const authenticate = async (req: Request | any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decodedToken: any = jwt.verify(token, `${process.env.SECRET_KEY}`);

    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export {
  authenticate
}