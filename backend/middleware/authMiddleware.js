import User from '../db/models/userModel.js';
import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
dotenv.config();

const protect = expressAsyncHandler(async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (bearerToken && bearerToken.startsWith('Bearer ')) {
    const token = bearerToken.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password'); //no need to get password
      console.log('User in protect middleware:', req.user); // Add this line to debug
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!bearerToken) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  next();
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };
