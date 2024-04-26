const express = require("express");
const router = express();
const verifyJWT = require("../../middlewares/jwtVerification");

const {
  getAddress,
  updateAddress,
} = require("../controllers/addressController");

router.route("/update").post(verifyJWT, updateAddress);
router.route("/get").get(verifyJWT, getAddress);

module.exports = router;
