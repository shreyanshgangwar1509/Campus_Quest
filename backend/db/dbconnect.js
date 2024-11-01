import mongoose from 'mongoose';
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO, {
      connectTimeoutMS: 10000,
    });
    console.log(
      `Connected to Mongodb database : ${connect.connection.name}`.bgGreen
    );
  } catch (error) {
    console.log(`Error in mongoDB ${error}`.bgRed);
  }
};
export default connectDB;