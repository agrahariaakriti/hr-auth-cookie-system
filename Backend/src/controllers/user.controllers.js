import uploadOnCloudinary from "../utils/cloudinary.js";
import {
  hashedPassword,
  isPasswordCorrect,
  generateAccessTokens,
  generateRefreshTokens,
} from "../models/user.model.js";
import { User } from "../models/user.model.js";
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
    avatar: avatarCloudinary.secure_url,
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
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
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
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  return res
    .status(200)
    .clearCookie("AccessToken", options)
    .clearCookie("RefeshToken", options)
    .json({ message: "User logout successFully" });
};
// // Exporting the controllers
//
//
export { registers, login, logout };
