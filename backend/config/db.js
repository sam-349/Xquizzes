const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    console.log("Connecting to MongoDB...");

    // No options required for mongoose v7+
    await mongoose.connect(uri);

    console.log("MongoDB Connected Successfully ✔");
  } catch (error) {
    console.error("MongoDB Connection Error ❌");
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
