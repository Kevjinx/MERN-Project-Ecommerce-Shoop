import express from 'express';
import { authUser, logoutUser } from '../controller/userController.js';

const userRoutes = express.Router();

userRoutes.post('/login', authUser);
userRoutes.post('/logout', logoutUser);

export default userRoutes;
