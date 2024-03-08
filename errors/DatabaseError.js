"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseError = void 0;
const BaseError_1 = require("./BaseError");
class DatabaseError extends BaseError_1.BaseError {
    constructor(errorString) {
        super(errorString, 102, DatabaseError.name);
    }
}
exports.DatabaseError = DatabaseError;
