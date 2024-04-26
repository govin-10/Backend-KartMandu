const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const updateAddress = async (req, res) => {
  const userAddress = req.body;
  // console.log
  const userId = req.user.id;
  console.log(userId);

  try {
    // Find the user by ID
    let user = await User.findById({ _id: userId });

    // If the user does not exist, return 404
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the address field of the user with the provided userAddress
    user.address ? (user.address = userAddress) : (user.address = userAddress);
    // user.markModified("address");

    // Save the updated user in the backend
    await user.save();

    // Respond with success message
    res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    // Handle any errors
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAddress = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);

  const user = await User.findById({ _id: userId });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const address = user.address;

  res.status(200).json({
    message: "Address fetched successfully",
    data: address,
  });
};

module.exports = { updateAddress, getAddress };
