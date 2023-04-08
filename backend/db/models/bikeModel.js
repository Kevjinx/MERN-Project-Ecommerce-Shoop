import mongoose from 'mongoose';

const bikeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  price: {
    type: String,
    required: true,
    default: '$0.00',
  },
  imageUrl: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
  wheelSize: {
    type: String,
    required: true,
  },
  drivetrainType: {
    type: String,
    required: true,
  },
  bikeModel: {
    type: String,
    required: true,
  },
  rearSuspensionType: {
    type: String,
    required: true,
  },
  forkTravel: {
    type: String,
    required: true,
  },
});

const Bike = mongoose.model('Bike', bikeSchema);
export default Bike;
