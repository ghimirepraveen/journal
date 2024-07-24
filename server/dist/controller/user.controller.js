"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgetPassword = exports.changePassword = exports.login = exports.register = void 0;
const catchasyc_1 = __importDefault(require("../error/catchasyc"));
const custom_erorr_1 = __importDefault(require("../error/custom.erorr"));
const sendemail_1 = require("../utils/sendemail");
const user_model_1 = __importDefault(require("../model/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.register = (0, catchasyc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
        throw new custom_erorr_1.default("Name, email, and password are required", 400);
    }
    const userExist = yield user_model_1.default.findOne({ email });
    if (userExist) {
        throw new custom_erorr_1.default("User already exists", 400);
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user = yield user_model_1.default.create({
        email,
        name,
        password: hashedPassword,
    });
    const userData = {
        _id: user._id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
    res.status(201).json(userData);
}));
exports.login = (0, catchasyc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        throw new custom_erorr_1.default("Email and password are required", 400);
    }
    const user = yield user_model_1.default.findOne({ email: email });
    if (!user) {
        throw new custom_erorr_1.default("Invalid credentials", 401);
    }
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new custom_erorr_1.default("Invalid credentials", 401);
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
    const sanitizedUser = {
        _id: user._id,
        email: user.email,
        name: user.name,
    };
    res
        .status(200)
        .cookie(process.env.COOKIES_NAME, JSON.stringify({ token, user: sanitizedUser }), {
        path: "/",
        secure: false,
        maxAge: 86400,
    })
        .json({
        user: sanitizedUser,
        token,
    });
}));
exports.changePassword = (0, catchasyc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.user);
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new custom_erorr_1.default("user not found", 404);
    }
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new custom_erorr_1.default("oldPassword and newPassword are required", 400);
    }
    const isMatch = yield bcrypt_1.default.compare(oldPassword, user.password);
    if (!isMatch) {
        throw new custom_erorr_1.default("invalid old password", 401);
    }
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
    user.password = hashedPassword;
    yield user.save();
    res.status(200).json({ message: "password changed" });
}));
//not tested
exports.forgetPassword = (0, catchasyc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        throw new custom_erorr_1.default("Email is required", 400);
    }
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        throw new custom_erorr_1.default("User not found", 404);
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "10m" });
    yield (0, sendemail_1.sendResetPasswordEmail)(email, token); //won't work for now
    res.status(200).json({ message: "Email sent" });
}));
//not tested
exports.resetPassword = (0, catchasyc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const { newPassword, verifiedPassword } = req.body;
    if (!newPassword || !verifiedPassword) {
        throw new custom_erorr_1.default("New password and verified password are required", 400);
    }
    if (newPassword !== verifiedPassword) {
        throw new custom_erorr_1.default("Passwords do not match", 400);
    }
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    catch (err) {
        throw new custom_erorr_1.default("Invalid or expired token", 401);
    }
    //@ts-ignore
    const user = yield user_model_1.default.findById(decodedToken.id);
    if (!user) {
        throw new custom_erorr_1.default("User not found", 404);
    }
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
    user.password = hashedPassword;
    yield user.save();
    res.status(200).json({ message: "Password updated successfully" });
}));
//TODO
//USer profile WIth date in it
