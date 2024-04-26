const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const nodemailer = require("nodemailer");

const generateToken = require("../utils/generateJWT");

const sendVerificationMail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.ADMIN_USER,
      pass: process.env.PASS,
    },
  });

  await transporter.sendMail({
    from: "work.kartmandu@gmail.com",
    to: email,
    subject: "Verify your email",
    text: `Please verify the email by clicking on this link: http://localhost:${process.env.PORT}/users/verify/${verificationToken}`,
  });
};

const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //req.file.path bata aako filename lai cloudinary ma upload gareko, yasle secure url dinchha ra tyaslai avatar ma store gareko
    // const uploadedImage = await cloudinary.uploader.upload(req.file.path);
    // const avatar = uploadedImage.secure_url;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        error: "Registration failed",
        message: "Email already exists",
      });
    }

    const hashedPW = await bcrypt.hash(password, 5);

    const user = await User.create({ name, email, password: hashedPW });
    // await user.save();
    user.verificationToken = crypto.randomBytes(20).toString("hex");
    await user.save();
    sendVerificationMail(user.email, user.verificationToken);

    res.status(200).json({
      message: "user creation successful",
      data: user,
    });
    // console.log(uploadedImage);
  } catch (e) {
    console.log(e);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // console.log(user);
  const correctPassword = await bcrypt.compare(password, user.password);
  // console.log(correctPassword);

  if (!user || !correctPassword) {
    return res.status(400).json({
      error: "Invalid email or password",
    });
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  const token = generateToken(payload);

  res.status(200).json({
    message: "Login Successful",
    token,
  });
};

const verifyUser = async (req, res) => {
  const token = req.params.token;
  const user = await User.findOne({ verificationToken: token });
  if (!user) {
    return res.status(400).json({
      message: "Invalid token",
    });
  }
  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();
  res.status(200).json({
    message: "Email verified successfully",
  });
};

const profileInfo = async (req, res) => {
  const userInfo = req.user;
  const user = await User.findById({ _id: userInfo.id });
  // console.log(user);
  return res.status(200).json({
    message: "User data fetched successfully",
    user,
  });
};

module.exports = {
  signupUser,
  loginUser,
  verifyUser,
  profileInfo,
};
