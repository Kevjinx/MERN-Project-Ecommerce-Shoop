import express from 'express';
import Product from '../db/models/productModel.js';
import expressAsyncHandler from 'express-async-handler'; // cool middleware to prevent RSI from writing try/catch blocks

const productRoutes = express.Router();

// @type    GET
// @route   /api/products/
// @desc    fetch all products
// @access  public
productRoutes.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({}); // find all products
    res.json(products);
  })
);

// @type    GET
// @route   /api/products/:productId
// @desc    fetch one product
// @access  public
productRoutes.get(
  '/:productId',
  expressAsyncHandler(async (req, res) => {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  })
);

export default productRoutes;
