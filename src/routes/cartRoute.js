const express = require("express");
const router = express();
const verifyJWT = require("../../middlewares/jwtVerification");

const {
  addToCart,
  getCart,
  removeFromCart,
} = require("../controllers/cartController");

router.route("/add").post(verifyJWT, addToCart);
router.route("/get").get(verifyJWT, getCart);
router.route("/delete/:itemId").delete(verifyJWT, removeFromCart);

module.exports = router;
