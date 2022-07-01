import mongoose from 'mongoose'
import colors from 'colors';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      user: "tapeUser",
      pass: "xyz19111",
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.error(`Error on MONGO: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
}

export default connectDB;
