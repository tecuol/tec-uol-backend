"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = void 0;
const BaseError_1 = require("./BaseError");
class InternalServerError extends BaseError_1.BaseError {
    constructor(errorString) {
        super(errorString, 105, InternalServerError.name);
    }
}
exports.InternalServerError = InternalServerError;
