"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImages = exports.upload = void 0;
const TECUOLLib_1 = require("../services/TECUOLLib");
const files_model_1 = __importDefault(require("../models/files.model"));
const files_routes_1 = require("../routes/files.routes");
const logging_service_1 = require("../services/logging.service");
const upload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const uploadedFile = req.file;
        if (!uploadedFile) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        if (uploadedFile.size > 10 * 1024 * 1024) {
            return res.status(400).json({ message: 'File size exceeds 10MB' });
        }
        if (!files_routes_1.allowedTypes.includes(uploadedFile.mimetype)) {
            return res.status(400).json({ message: 'Invalid file type' });
        }
        const subdirectory = uploadedFile.mimetype.startsWith('image/') ? 'image' : 'doc';
        const fileData = {
            src: `${process.env.DOMAIN}/${subdirectory}/${uploadedFile.filename}`,
            name: uploadedFile.originalname,
            type: uploadedFile.mimetype,
            size: uploadedFile.size,
            ext: uploadedFile.mimetype.split('/')[1],
            tags: ((_a = req.body.tags) === null || _a === void 0 ? void 0 : _a.toString()) || '',
        };
        const savedFile = yield (0, TECUOLLib_1.createOrUpdate)({
            data: fileData,
            model: files_model_1.default,
        });
        res.send(Object.assign({}, savedFile));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.upload = upload;
const getImages = (id_string) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!id_string) {
            return null;
        }
        id_string = id_string.split(",");
        return yield files_model_1.default.findAll({
            attributes: ['id', 'name', 'src'],
            where: {
                id: id_string
            },
        });
    }
    catch (error) {
        (0, logging_service_1.logError)(error);
    }
});
exports.getImages = getImages;
