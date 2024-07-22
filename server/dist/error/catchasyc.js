"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = asyncCatch;
function asyncCatch(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
