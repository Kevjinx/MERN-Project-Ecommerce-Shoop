import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: false,
      trim: true,
    },
    lastName: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    realPassword: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

//turns out arrow functions makes 'this' refer to the lexical scope of the function.
//So, we need to use a regular function here. *facepalm*
userSchema.methods.matchPassword = async function (enteredPassword) {
  //'this' is referring to the user object from userController
  return await bcrypt.compare(enteredPassword, this.password);
};

//pre-save middleware to hash the password before saving it to the database
//hash password in middleware instead of in the controller to keep the controller clean
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    const hash = await bcrypt.hashSync(user.password, 10);
    user.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model('User', userSchema);
export default User;
