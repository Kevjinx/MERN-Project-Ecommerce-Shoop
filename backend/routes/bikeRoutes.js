import express from 'express';
import { getBikes, getBikeById } from '../controller/bikeController.js';

const bikeRoutes = express.Router();

bikeRoutes.route('/').get(getBikes);
bikeRoutes.route('/:bikeId').get(getBikeById);

export default bikeRoutes;
