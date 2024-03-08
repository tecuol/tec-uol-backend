"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
class BaseError {
    constructor(errorString, code, name) {
        this.message = errorString;
        this.code = code;
        this.name = name;
    }
}
exports.BaseError = BaseError;
