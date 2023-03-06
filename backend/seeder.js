import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './db/models/userModel.js';
import Product from './db/models/productModel.js';
import Order from './db/models/orderModel.js';
import dbConnect from './db/dbConnect.js';
import bcrypt from 'bcrypt';

dotenv.config();

dbConnect();

const importData = async () => {
  try {
    // Clear all data in the database
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Hash the password for each user
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        const hashedUsers = {
          ...user,
          password: hash,
          realPassword:
            process.env.NODE_ENV === 'development' ? user.password : null,
        };

        return hashedUsers;
      })
    );

    const createdUsers = await User.insertMany(hashedUsers); //arrays of users

    const adminUser = createdUsers[0]._id;

    // reference admin user to all products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

process.argv[2] === '-d' ? destroyData() : importData();

// Run the script with the following command:
// from package.json
//   "data:import": "node backend/seeder.js",
//   "data:destroy": "node backend/seeder.js -d"
