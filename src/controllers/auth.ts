import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import User from "../models/User";

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  try {
   
    const user = new User({ username, email, password });

    await user.save();

    res.json({ message: 'Registration successful' });
  } catch (error: any) {

    if (error?.code === 11000) {
      const duplicateKey = Object.keys(error?.keyPattern)[0];

      return res.status(409).json({ message: `There is already a user with this ${duplicateKey}`, field: duplicateKey });
    }
    
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { login, password } = req.body;

  try {

    const user: any = await User.findOne({
      $or: [
        { username: login },
        { email: login }
      ]
    });

    if (!user) {
      return res.status(401).json({ message: 'Account not found' });
    }

    const passwordMatch = await user.comparePassword(password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Account not found' });
    }

    const token = jwt.sign({ userId: user._id }, `${process.env.SECRET_KEY}`, {
      expiresIn: '1 hour'
    });

    res.json({ user, token });
    
  } catch (error) {
    next(error);
  }
};

export {
  register,
  login
};