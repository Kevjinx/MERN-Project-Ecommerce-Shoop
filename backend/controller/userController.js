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
    throw new Error('your email and or password is no good here, try again');
  }
});

// @type    GET
// @route   /api/users/profile
// @desc    get user profile
// @access  private
const getUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  //can use req.user in any protected route
  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('there ain"t no user by that name here');
  }
});

// @type    POST
// @route   /api/users
// @desc    register a new user
// @access  public
const registerUser = expressAsyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const existingUserSameEmail = await User.findOne({ email });
  if (existingUserSameEmail) {
    res.status(400);
    throw new Error('someone else took your name, too bad');
  }
  const user = await User.create({
    email,
    password, //password is hashed in the userModel via pre-save middleware
    firstName,
    lastName,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('the user data you gave aint working');
  }
});

// @type    PUT
// @route   /api/users/profile
// @desc    update user profile
// @access  private
const updateUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;

    //password is hashed in the userModel via pre-save middleware
    req.body.password && (user.password = req.body.password);

    const updatedUser = await user.save();
    res.json({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      password: user.password,
    });
  } else {
    res.status(404);
    throw new Error('there ain"t no user by that name here');
  }
});

// @type    GET
// @route   /api/users/
// @desc    get all users info
// @access  admin
const getAllUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find();
  console.log('users: ', users);
  res.json(users);
});

// @type    GET
// @route   /api/users/:id
// @desc    get user profile
// @access  admin
const getUserById = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  //can use req.user in any protected route
  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('there ain"t no user by that name here');
  }
});

// @type    PUT
// @route   /api/users/:id
// @desc    update user profile
// @access  admin
const updateUserById = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;

    //password is hashed in the userModel via pre-save middleware
    req.body.password && (user.password = req.body.password);

    const updatedUser = await user.save();
    res.json({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      password: user.password,
    });
  } else {
    res.status(404);
    throw new Error('there ain"t no user by that name here');
  }
});

// @type    DELETE
// @route   /api/users/:id
// @desc    delete user
// @access  admin
const deleteUserById = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({
      message:
        'goodbye user, you will be forgotten as we dont keep your data forever like someone we know...',
    });
  } else {
    res.status(404);
    throw new Error('there ain"t no user by that name here');
  }
});

export {
  authUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
