import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
dotenv.config();

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      //required options for mongoose 6.0+
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      colors.rainbow(`MongoDB connected: ${connect.connection.host}`)
    );
  } catch (error) {
    console.log(colors.red('error: ', error.message));
    process.exit(1); //exit with failure
  }
};

export default dbConnect;
