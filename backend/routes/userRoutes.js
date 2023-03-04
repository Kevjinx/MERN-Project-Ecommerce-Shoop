import express from 'express';
import {
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from '../controller/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const userRoutes = express.Router();

userRoutes.post('/login', authUser);
userRoutes.post('/logout', logoutUser);

userRoutes
  .route('/profile')
  .get(authMiddleware, getUserProfile)
  .put(authMiddleware, updateUserProfile);

export default userRoutes;
