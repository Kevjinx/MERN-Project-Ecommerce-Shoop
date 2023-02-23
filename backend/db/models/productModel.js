import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Please enter product price'],
    default: 0.0,
  },
  image: {
    type: String,
    required: [true, 'Please enter product image'],
  },
  brand: {
    type: String,
    required: [true, 'Please enter product brand'],
  },
  description: {
    type: String,
    required: [true, 'Please enter product description'],
  },
  category: {
    type: String,
    required: [true, 'Please enter product category'],
  },
  countInStock: {
    type: Number,
    required: [true, 'Please enter product countInStock'],
    default: 0,
  },
  rating: {
    type: Number,
    required: [true, 'Please enter product rating'],
    default: 0,
  },
  numReviews: {
    type: Number,
    required: [true, 'Please enter product numReviews'],
    default: 0,
  },
});

const Product = mongoose.model('Product', productSchema);
export default Product;
