import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      //required options for mongoose 6.0+
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.log('error: ', error.message);
    process.exit(1); //exit with failure
  }
};

export default dbConnect;
