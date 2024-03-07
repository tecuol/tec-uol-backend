"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInfo = exports.logError = void 0;
const winston = __importStar(require("winston"));
const winston_1 = require("winston");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const moment_timezone_1 = __importDefault(require("moment-timezone")); // Add moment for time zone support
const IST = 'Asia/Kolkata'; // Define Indian time zone
moment_timezone_1.default.tz.setDefault('Asia/Kolkata');
const formatTimestampIST = () => {
    return () => (0, moment_timezone_1.default)().tz(IST).format('ddd, Do MMM YYYY, h:mm:ss A'); // Use 'A' for AM/PM
};
const logger = winston.createLogger({
    format: winston_1.format.combine(winston_1.format.label({ label: 'tec-uol' }), winston_1.format.timestamp({
        format: formatTimestampIST(),
    }), winston_1.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: (() => {
                const nowInIST = (0, moment_timezone_1.default)().tz(IST); // Get current time in IST
                const YYYYMMDD = nowInIST.format('YYYYMMDD'); // Format for file name
                const destination = path_1.default.join(__dirname, '..', '..', 'logs');
                const filename = path_1.default.join(destination, `tec-uol-${YYYYMMDD}.log`);
                if (!fs_1.default.existsSync(destination)) {
                    fs_1.default.mkdirSync(destination);
                }
                if (!fs_1.default.existsSync(filename)) {
                    fs_1.default.openSync(filename, 'w'); // Create file if needed
                }
                return filename;
            })(), // Type assertion
        }),
    ],
});
function logError(error, req) {
    var _a;
    const userMessage = req
        ? `User: ${(_a = req.user) === null || _a === void 0 ? void 0 : _a.email}`
        : undefined;
    logger.error(`${error.message}${userMessage ? `\n${userMessage}` : ''}\n${error.stack} \n\n`);
}
exports.logError = logError;
function logInfo(message, req) {
    var _a, _b;
    const userMessage = req
        ? `User: ${((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.email)}`
        : undefined;
    logger.info(`${message}${userMessage ? `\n${userMessage}` : ''}`);
}
exports.logInfo = logInfo;
