import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
export const authMiddleware = async (req, res, next) => {
  try {
    console.log("Inside Auth middlewar..e", req.cookies);

    const token = req.cookies?.AccessToken;
    if (!token) return res.status(401).json({ message: "Token not provided" });

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decodedToken)
      return res.status(401).json({ message: "Invalid user Hii" });

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid User" });
  }
};
