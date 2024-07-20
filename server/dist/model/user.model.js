"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        default: null,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    journals: [
        {
            type: Schema.Types.ObjectId,
            ref: "Journal",
        },
    ],
});
userSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});
const User = mongoose.model("User", userSchema);
exports.default = User;
