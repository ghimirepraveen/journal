"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const auth_1 = __importDefault(require("../middleware/auth"));
const userRouter = (0, express_1.default)();
userRouter.post("/register", user_controller_1.register);
userRouter.post("/login", user_controller_1.login);
userRouter.use(auth_1.default);
userRouter.post("/changepassword ", user_controller_1.changePassword);
// userRouter.post("/resetpassword/:token", resetPassword);
exports.default = userRouter;
