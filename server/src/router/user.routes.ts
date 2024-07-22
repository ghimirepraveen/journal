import Router from "express";
import { register } from "../controller/user.controller";

const userRouter = Router();

userRouter.post("/register", register);

export default userRouter;
