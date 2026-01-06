import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  registers,
  login,
  logout,
  ChngData,
} from "../controllers/user.controllers.js";
import { upload } from "../middleware/multer.middleware.js";
const userRouter = Router();

//⭐ Means: “Any request starting with /api/v1/users → send it to userRoutes”
userRouter.route("/register").post(upload.single("avatar"), registers);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(authMiddleware, logout);
userRouter.route("/protected").get(authMiddleware, (req, res) => {
  console.log("Inside protected route", req.user);
  return res
    .status(200)
    .json({ message: "You are in protected route", user: req.user });
});
userRouter
  .route("/chgData")
  .post(authMiddleware, upload.single("avatar"), ChngData);
export default userRouter;
