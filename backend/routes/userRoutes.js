import express from 'express';
import {
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
} from '../controller/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const userRoutes = express.Router();

userRoutes.post('/', registerUser); // '/' instead of '/register' to follow RESTful API convention
userRoutes.post('/login', authUser);
userRoutes.post('/logout', logoutUser);

userRoutes
  .route('/profile')
  .get(authMiddleware, getUserProfile)
  .put(authMiddleware, updateUserProfile);

export default userRoutes;
