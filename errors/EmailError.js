"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailError = void 0;
const BaseError_1 = require("./BaseError");
class EmailError extends BaseError_1.BaseError {
    constructor(errorString) {
        super(errorString, 105, EmailError.name);
    }
}
exports.EmailError = EmailError;
