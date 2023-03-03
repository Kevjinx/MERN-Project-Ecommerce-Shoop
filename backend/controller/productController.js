import expressAsyncHandler from 'express-async-handler';
import Product from '../db/models/productModel.js';

// @type    GET
// @route   /api/products/
// @desc    fetch all products
// @access  public
const getProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({}); // find all products
  res.json(products);
});

// @type    GET
// @route   /api/products/:productId
// @desc    fetch one product
// @access  public
const getProductById = expressAsyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProducts, getProductById };
