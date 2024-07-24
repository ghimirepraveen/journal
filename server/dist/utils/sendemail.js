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
exports.sendResetPasswordEmail = void 0;
require("dotenv").config();
const googleapis_1 = require("googleapis");
const nodemailer_1 = __importDefault(require("nodemailer"));
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const createTransporter = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oAuth2Client = new googleapis_1.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
        oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
        const accessToken = yield new Promise((resolve, reject) => {
            oAuth2Client.getAccessToken((error, token) => {
                if (error) {
                    reject(error);
                }
                resolve(token);
            });
        });
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.USER_EMAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });
        return transporter;
    }
    catch (err) {
        throw err;
    }
});
const sendResetPasswordEmail = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    const emailConfig = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Reset Password",
        html: `<h1>Reset Your Password</h1>
           <p>Click on the following link to reset your password:</p>
           <a href="localhost${token}">Reset Password</a>
           <p>The link will expire in 10 minutes.</p>
           <p>If you didn't request a password reset, please ignore this email.</p>`,
    };
    try {
        const mailTransporter = yield createTransporter();
        yield mailTransporter.sendMail(emailConfig);
        return {
            status: 200,
            message: "Reset password email has been sent.",
        };
    }
    catch (error) {
        console.log(`Transporter: ${error}`);
        return {
            status: 500,
            message: "Failed to send reset password email.",
        };
    }
});
exports.sendResetPasswordEmail = sendResetPasswordEmail;
