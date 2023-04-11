import express from 'express';
import {
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
  getAllUsers,
  updateUserById,
  getUserById,
  deleteUserById,
} from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import dotenv from 'dotenv';
dotenv.config();

const userRoutes = express.Router();

userRoutes.post('/', registerUser); // '/' instead of '/register' to follow RESTful API convention
userRoutes.post('/login', authUser);
userRoutes.post('/logout', logoutUser);

userRoutes
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

userRoutes
  .route('/:id')
  .delete(protect, admin, deleteUserById)
  .get(protect, admin, [getUserById, getAllUsers])
  .put(protect, admin, updateUserById);

export default userRoutes;
