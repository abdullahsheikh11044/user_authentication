const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://abdullahrafiq:123@cluster0.adtx9ww.mongodb.net/mydatabase"
    );
    console.log("DB connection established");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
