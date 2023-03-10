import express from 'express';
import {
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
  getAllusers,
} from '../controller/userController.js';
import { protext } from '../middleware/authMiddleware.js';
import dotenv from 'dotenv';
dotenv.config();

const userRoutes = express.Router();

userRoutes.post('/', registerUser); // '/' instead of '/register' to follow RESTful API convention
userRoutes.post('/login', authUser);
userRoutes.post('/logout', logoutUser);

if (process.env.NODE_ENV === 'development') {
  userRoutes.get('/admingetallusers', getAllusers);
}

userRoutes
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protext, updateUserProfile);

export default userRoutes;
