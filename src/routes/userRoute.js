const express = require("express");
const router = express();
const verifyJWT = require("../../middlewares/jwtVerification");

//importing signUp function from controller
const {
  signupUser,
  loginUser,
  verifyUser,
  profileInfo,
} = require("../controllers/userController");

//the upload controller to upload the files using multer
// const upload = require("../utils/multerConfig");
// const verifyJWT = require("../middleware/jwtVerification");

//the post request for signup
router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/verify/:token").get(verifyUser);
router.route("/profile").get(verifyJWT, profileInfo);

module.exports = router;
