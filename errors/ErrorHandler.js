"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const RegistrationError_1 = require("./RegistrationError");
const AuthError_1 = require("./AuthError");
const DatabaseError_1 = require("./DatabaseError");
const NotFoundError_1 = require("./NotFoundError");
const sequelize_1 = require("sequelize");
const InternalServerError_1 = require("./InternalServerError");
const ValidationError_1 = require("./ValidationError");
function errorHandler(error, req, res, next) {
    if (error instanceof RegistrationError_1.RegistrationError) {
        console.error(error);
        return res.status(400).json(error);
    }
    if (error instanceof AuthError_1.AuthError) {
        console.error(error);
        return res.status(401).json(error);
    }
    if (error.name === 'AuthenticationError') {
        console.error(error.message);
        return res.status(403).json(error);
    }
    if (error instanceof DatabaseError_1.DatabaseError) {
        console.error(error);
        return res.status(500).json(error);
    }
    if (error instanceof sequelize_1.DatabaseError) {
        console.error(error.message);
        return res.status(500).json(new DatabaseError_1.DatabaseError(error.message));
    }
    if (error instanceof NotFoundError_1.NotFoundError) {
        console.error(error);
        return res.status(404).json(error);
    }
    if (error instanceof sequelize_1.ValidationError) {
        console.error(error.message);
        return res.status(400).json(new ValidationError_1.ValidationError(error.message));
    }
    console.error(error.message);
    return res.status(500).json(new InternalServerError_1.InternalServerError(error.message));
}
exports.errorHandler = errorHandler;
