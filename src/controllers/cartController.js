const User = require("../models/userModel");
const Cart = require("../models/cartModel");

const addToCart = async (req, res) => {
  try {
    const cartItems = req.body;
    const userId = req.user.id;

    // Find the cart for the given user
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // If the cart doesn't exist, create a new one

      cart = new Cart({ user: userId, cart: [cartItems] });
    } else {
      // Check if the item already exists in the cart
      const existingItemIndex = cart.cart.findIndex(
        (cartItem) => cartItem.id === cartItems.id
      );

      if (existingItemIndex !== -1) {
        // If the item exists, increase its quantity

        return res.status(200).json({
          message: "Product already added to cart",
        });
        // await Cart.save();
      } else {
        // If the item doesn't exist, add it to the cart

        cart.cart.push(cartItems);
      }
    }

    // Save the updated cart
    await cart.save();

    res
      .status(200)
      .json({ success: true, message: "Cart updated successfully", cart });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Controller function to get the cart for a user
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the cart for the given user
    const cartInfo = await Cart.findOne({ user: userId });

    if (!cartInfo) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found for the user" });
    }

    const cart = cartInfo.cart;

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const itemId = req.params.itemId; // Assuming itemId is passed as a route parameter
    const userId = req.user.id;

    // Find the cart for the given user
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for the user",
      });
    }

    // Check if the item exists in the cart
    const existingItemIndex = cart.cart.findIndex(
      (cartItem) => cartItem.id == itemId
    );

    if (existingItemIndex == -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in the cart",
      });
    }

    // Remove the item from the cart
    cart.cart.splice(existingItemIndex, 1);
    cart.markModified("cart");

    // Save the updated cart
    await cart.save();

    res
      .status(200)
      .json({ success: true, message: "Item removed from cart successfully" });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// const clearCart = async (req, res) => {
//   const userId = req.user.id;
//   await Cart.findByIdAndDelete({ _id: userId })

//   // console.log(carts);
//   return res.status(200).json({
//     message: "Cart cleared.",
//   });
// };

module.exports = { addToCart, getCart, removeFromCart };
