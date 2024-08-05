import Router from "express";
import {
  register,
  login,
  changePassword,
  forgetPassword,
  resetPassword,
} from "../controller/user.controller";
import auth from "../middleware/auth";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/forgotpassword", forgetPassword);

userRouter.post("/resetpassword/:token", resetPassword);

userRouter.use(auth);

userRouter.post("/changepassword", changePassword);

export default userRouter;
