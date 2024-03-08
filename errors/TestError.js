"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestError = void 0;
const BaseError_1 = require("./BaseError");
class TestError extends BaseError_1.BaseError {
    constructor(errorString) {
        super(errorString, 107, TestError.name);
    }
}
exports.TestError = TestError;
