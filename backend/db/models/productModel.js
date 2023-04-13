import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
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
    type: Number,
    required: true,
    default: 0,
  },
  reviews: [
    {
      firstName: {
        type: String,
        required: false,
      },
      lastName: {
        type: String,
        required: false,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: false,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
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
    required: false,
  },
  drivetrainType: {
    type: String,
    required: false,
  },
  bikeModel: {
    type: String,
    required: false,
  },
  rearSuspensionType: {
    type: String,
    required: false,
  },
  forkTravel: {
    type: String,
    required: false,
  },
});

const Product = mongoose.model('Product', productSchema);
export default Product;
