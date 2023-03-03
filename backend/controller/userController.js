import expressAsyncHandler from 'express-async-handler';
import User from '../db/models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @type    POST
// @route   /api/users/login
// @desc    auth user and get token
// @access  public
const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @type    POST
// @route   /api/users/logout
// @desc    logout user and destroy token
// @access  public
const logoutUser = expressAsyncHandler(async (req, res) => {});

export { authUser, logoutUser };
