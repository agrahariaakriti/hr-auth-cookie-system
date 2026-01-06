import { uploadOnCloudinary } from "../utils/cloudinary.js";
import nodemailer from "nodemailer";
import {
  hashedPassword,
  isPasswordCorrect,
  generateAccessTokens,
  generateRefreshTokens,
} from "../models/user.model.js";
import { User } from "../models/user.model.js";
import crypto from "crypto";
import { deleteFromCloudinary } from "../utils/cloudinary.js";
//
//
//

// Register Controller
//
//
//
const registers = async (req, res) => {
  console.log("Request Enter To Register controller....", req.body);

  const { username, email, password, fullname } = req.body;
  if (password.length <= 5) {
    return res
      .status(400)
      .json({ message: "Password must be minimum of 6 length" });
  }
  if (!username || !email || !password || !fullname) {
    return res.status(400).json({ message: "All field must be entered" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(401).json({ message: "Enter the valid email " });
  }
  const existUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existUser) {
    return res.status(409).json({ message: "User already Exist" });
  }

  const avatartLocalPath = req.file.path;
  if (!avatartLocalPath) {
    return res.status(409).json({ message: "avatar Not Found at abackend" });
  }
  const avatarCloudinary = await uploadOnCloudinary(avatartLocalPath);
  const hashPassword = await hashedPassword(password);
  const user = await User.create({
    username,
    email,
    password: hashPassword,
    fullname,
    avatar: {
      url: avatarCloudinary.secure_url,
      avatar_public_id: avatarCloudinary.public_id,
    },
  });
  const userCreatedOrNot = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const users = await User.find();
  if (!userCreatedOrNot)
    return res
      .status(400)
      .json({ message: "Something went wrong .... Please Try later" });

  return res
    .status(200)
    .json({ message: "User formed SuccessFully", data: user });
};
//
//
//
// Login Controller
//
//
//
const login = async (req, res) => {
  console.log("Enter to the loin Controller...", req.body);

  const { username, email, password } = req.body;
  if (!username && !email)
    return res.status(400).json({ message: "Field must be entered" });

  const user = await User.findOne({ $or: [{ email }, { username }] });

  if (!user) return res.status(400).json({ message: "Invalid credential" });

  const isPasswordValid = await isPasswordCorrect(user.password, password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Enter the Correct Password" });
  }

  var Accesstoken = generateAccessTokens(user);
  var Refreshtoken = generateRefreshTokens(user);

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  };

  user.refreshToken = Refreshtoken;
  await user.save();

  return res
    .status(200)
    .cookie("AccessToken", Accesstoken, options)
    .cookie("RefreshToken", Refreshtoken, options)
    .json({ message: "User Login SuccessFully", data: user });
};
//
//
//
// Logout Controller
//
//
//

const logout = async (req, res) => {
  const user = req.user;
  await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        refreshToken: null,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  };

  return res
    .status(200)
    .clearCookie("AccessToken", options)
    .clearCookie("RefreshToken", options)
    .json({ message: "User logout successFully" });
};

const ChngData = async (req, res) => {
  console.log("just enter..............", req.body);
  const { username, email, fullname } = req.body;
  const user = req.user;
  const localavatarPath = req.file.path;
  const avatarCloudinary = await uploadOnCloudinary(localavatarPath);

  if (!avatarCloudinary)
    return res.status(400).json({ message: "Fail to upload on Cloudinary" });
  console.log("hll..........", user.avatar);

  if (user.avatar.avatar_public_id)
    await deleteFromCloudinary(user.avatar.avatar_public_id);

  console.log("after getting images..........", avatarCloudinary.secure_url);
  if (!username && !email && !fullname && !localavatarPath) {
    return res.status(400).json({ message: "All field are empty" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email != "" && !emailRegex.test(email)) {
    return res.status(401).json({ message: "Enter the valid email " });
  }
  console.log("after checking mail");

  if (username != "") user.username = username;
  if (fullname != "") user.fullname = fullname;
  if (email != "") user.email = email;

  if (avatarCloudinary.secure_url != null) {
    user.avatar.url = avatarCloudinary.secure_url;
    user.avatar.avatar_public_id = avatarCloudinary.public_id;
  }

  await user.save();
  console.log("my data is here ....", req.user);

  return res
    .status(200)
    .json({ message: "User Detail updated success Fully", data: req.user });
};
export { registers, login, logout, ChngData };
