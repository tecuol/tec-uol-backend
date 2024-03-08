import { Router } from 'express';
// import authController from '../controllers/_auth.conroller';
import rateLimiter from 'express-rate-limit';

const limiter = rateLimiter({
    max: 3,
    windowMs: 30 * 60 * 100,
    message: 'Too many OTP requested. Please wait for a while and try again.'
})
export const AuthRoutes = Router();

// AuthRoutes.post('/get-otp', limiter, authController.GetOtp);
// AuthRoutes.post('/resend-otp', limiter, authController.ResendOtp);
// AuthRoutes.post('/verify-firebase-token', authController.VerifyToken);
// AuthRoutes.post('/logout', authController.Logout);