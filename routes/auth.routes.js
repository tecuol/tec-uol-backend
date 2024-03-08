"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
// import authController from '../controllers/_auth.conroller';
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const limiter = (0, express_rate_limit_1.default)({
    max: 3,
    windowMs: 30 * 60 * 100,
    message: 'Too many OTP requested. Please wait for a while and try again.'
});
exports.AuthRoutes = (0, express_1.Router)();
// AuthRoutes.post('/get-otp', limiter, authController.GetOtp);
// AuthRoutes.post('/resend-otp', limiter, authController.ResendOtp);
// AuthRoutes.post('/verify-firebase-token', authController.VerifyToken);
// AuthRoutes.post('/logout', authController.Logout);
