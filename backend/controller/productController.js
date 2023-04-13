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
  console.log('Product ID (server-side):', productId); // Add this line to print the productId

  const product = await Product.findById(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('there aint no product here by that name getProductById');
  }
});

// @type    DELETE
// @route   /api/products/:productId
// @desc    delete one product
// @access  admin
const deleteProductById = expressAsyncHandler(async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  if (product) {
    await product.remove();
    res.json({ message: `say goodbye to ${product.name} forever` });
  } else {
    res.status(404);
    throw new Error('there aint no product here by that name');
  }
});

// @type    POST
// @route   /api/products/
// @desc    create one product
// @access  admin
const createProduct = expressAsyncHandler(async (req, res) => {
  const {
    name,
    price,
    imageUrl,
    brand,
    category,
    countInStock,
    wheelSize = '',
    drivetrainType = '',
    bikeModel = '',
    rearSuspensionType = '',
    forkTravel = '',
  } = req.body;
  const product = new Product({
    name,
    price,
    imageUrl,
    brand,
    category,
    countInStock,
    wheelSize,
    drivetrainType,
    bikeModel,
    rearSuspensionType,
    forkTravel,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @type    PUT
// @route   /api/products/:productId
// @desc    update one product
// @access  admin
const updateProduct = expressAsyncHandler(async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  if (product) {
    const { name, price, imageUrl, brand, category, countInStock } = req.body;
    product.name = name || product.name;
    product.price = price || product.price;
    product.imageUrl = imageUrl || product.imageUrl;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('there aint no product here by that name');
  }
});

// @type    POST
// @route   /api/products/:productId/reviews
// @desc    fetch one product
// @access  public
const createProductReview = expressAsyncHandler(async (req, res) => {
  console.log('reqbody', req.body);
  console.log('requse', req.user);
  const { rating, comment, firstName, lastName, user } = req.body;
  const { productId } = req.params;
  const product = await Product.findById(productId);

  if (product) {
    const review = {
      firstName,
      lastName,
      rating: Number(rating),
      comment,
      user,
    };

    console.log('review:', review);
    console.log(typeof review.rating);

    product.reviews.push(review);

    await product.save();
    res.json(product);
  } else {
    res.status(404);
    throw new Error(
      'there aint no product here by that name, createProductReview'
    );
  }
});

export {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
  createProductReview,
};
