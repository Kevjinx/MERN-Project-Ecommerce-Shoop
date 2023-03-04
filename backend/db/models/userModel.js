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
      required: true,
      default: false,
    },
    password: {
      type: String,
      required: true,
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
  return await bcrypt.compare(enteredPassword, this.hashPassword);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    //if the password is not modified, then we don't need to hash it again when updating the user profile
    next();
  }
  user.password = bcrypt.hashSync(user.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);
export default User;
