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
exports.generateAndRespondAIContent = void 0;
const catchasyc_1 = __importDefault(require("../error/catchasyc"));
const custom_erorr_1 = __importDefault(require("../error/custom.erorr"));
const generateAiContent_1 = require("../utils/generateAiContent");
exports.generateAndRespondAIContent = (0, catchasyc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt } = req.body;
    if (!prompt) {
        throw new custom_erorr_1.default("Prompt is required", 400);
    }
    const aiContent = yield (0, generateAiContent_1.generateAIContent)(prompt);
    res.status(200).json({ aiContent });
}));
