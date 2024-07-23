import Router from "express";
import { register, login, changePassword } from "../controller/user.controller";
import auth from "../middleware/auth";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);

userRouter.use(auth);
userRouter.post("/changepassword ", changePassword);

// userRouter.post("/resetpassword/:token", resetPassword);

export default userRouter;
