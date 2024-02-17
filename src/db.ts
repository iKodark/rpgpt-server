import { connect, ConnectOptions } from "mongoose";

const connectDB = async () => {
  try {
    await connect(`${process.env.MONGODB_URI}`, {
      dbName: `${process.env.MONGODB_DATABASE}`
    } as ConnectOptions);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
};

export default connectDB;