"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedTypes = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const file_controller_1 = require("../controllers/file.controller");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const subdirectory = file.mimetype.startsWith('image/') ? 'image' : 'doc';
        const destination = path_1.default.join(__dirname, '..', '..', 'src', 'public', subdirectory);
        if (!fs_1.default.existsSync(destination)) {
            fs_1.default.mkdirSync(destination);
        }
        cb(null, destination);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    },
});
const uploadDoc = (0, multer_1.default)({ storage: storage });
const FileRouts = (0, express_1.Router)();
FileRouts.post('/upload', uploadDoc.single('file'), file_controller_1.upload);
exports.default = FileRouts;
exports.allowedTypes = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'application/pdf',
    'application/msword',
    'application/vnd.ms-excel',
    'application/vnd.ms-powerpoint',
];
