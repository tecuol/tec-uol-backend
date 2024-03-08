"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationError = void 0;
const BaseError_1 = require("./BaseError");
class RegistrationError extends BaseError_1.BaseError {
    constructor(errorString) {
        super(errorString, 101, 'RegistrationError');
    }
}
exports.RegistrationError = RegistrationError;
