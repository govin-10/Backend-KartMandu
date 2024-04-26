//dotenv
const dotenv = require("dotenv");
dotenv.config();

//mongoose connection
const mongoose = require("mongoose");
const app = require("./app");

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error in database connection");
  }
};

connectDB();

//server initialization
app.listen(process.env.PORT, () => {
  console.log(`Server started at http://localhost:${process.env.PORT}/`);
});
