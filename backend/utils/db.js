import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB has been successfully connected');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

export default connectDB;
