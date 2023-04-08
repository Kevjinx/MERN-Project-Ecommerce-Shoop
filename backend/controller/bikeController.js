import expressAsyncHandler from 'express-async-handler';
import Bike from '../db/models/bikeModel.js';

// @type    GET
// @route   /api/bikes/
// @desc    fetch all bikes
// @access  public
const getBikes = expressAsyncHandler(async (req, res) => {
  const bikes = await Bike.find({}); // find all bikes
  res.json(bikes);
});

// @type    GET
// @route   /api/bikes/:bikeId
// @desc    fetch one product
// @access  public
const getBikeById = expressAsyncHandler(async (req, res) => {
  const { bikeId } = req.params;

  const bike = await Bike.findById(bikeId);

  if (bike) {
    res.json(bike);
  } else {
    res.status(404);
    throw new Error('bike not found');
  }
});

export { getBikes, getBikeById };
