const express = require("express");
const router = express();

const { paymentIntent } = require("../controllers/paymentIntent");

router.route("/payment-intent").post(paymentIntent);

module.exports = router;
