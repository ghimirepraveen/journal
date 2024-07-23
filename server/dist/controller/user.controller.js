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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const catchasyc_1 = __importDefault(require("../error/catchasyc"));
const custom_erorr_1 = __importDefault(require("../error/custom.erorr"));
const user_model_1 = __importDefault(require("../model/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.register = (0, catchasyc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
        throw new custom_erorr_1.default("email and password are required", 400);
    }
    const userExist = yield user_model_1.default.findOne({ email: email });
    if (userExist) {
        throw new custom_erorr_1.default("user already exist", 400);
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user = yield user_model_1.default.create({
        email: email,
        name: name,
        password: hashedPassword,
    });
    const { password: _, id: undefined, createdAt, updatedAt } = user, userdata = __rest(user, ["password", "id", "createdAt", "updatedAt"]);
    console.log(userdata);
    res.status(201).json(userdata);
}));
exports.login = (0, catchasyc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new custom_erorr_1.default("email and password are required", 400);
    }
    const user = user_model_1.default.findOne({ email: email });
    if (!user)
        throw new custom_erorr_1.default("email and password are required", 400);
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch)
        throw new custom_erorr_1.default("invalid credentials", 401);
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
    let sanitizedUser = Object.assign(Object.assign({}, user), { id: undefined, password: undefined, createdAt: undefined, updatedAt: undefined });
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
