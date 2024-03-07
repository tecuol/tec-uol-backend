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
exports.Router = void 0;
const express = __importStar(require("express"));
const Tesseract = __importStar(require("tesseract.js"));
const ocrad = require('ocrad.js');
const vision_1 = require("@google-cloud/vision");
const path_1 = __importDefault(require("path"));
const files_routes_1 = __importDefault(require("./files.routes"));
const main_slider_routes_1 = __importDefault(require("./main_slider.routes"));
const masters_1 = require("./masters");
const participant_routes_1 = __importDefault(require("./participant.routes"));
const events_routes_1 = __importDefault(require("./events.routes"));
const contact_us_routes_1 = __importDefault(require("./contact_us.routes"));
function recognizeTextOCR(imagePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const text = ocrad(imagePath, {
            lang: 'urd', // Specify the language as Urdu
        });
        return text;
    });
}
function recognizeText(imagePath, languageHints = ['ur']) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new vision_1.ImageAnnotatorClient({
            keyFilename: path_1.default.join(__dirname, '..', '..', 'google-key-file-shoqbo-.json')
        });
        try {
            const [result] = yield client.textDetection(imagePath);
            const detections = result.textAnnotations;
            if (detections.length === 0) {
                console.log('No text found.');
                return [];
            }
            const texts = detections.map((annotation) => annotation.description);
            return texts;
        }
        catch (error) {
            console.error('Error recognizing text:', error);
            throw error;
        }
    });
}
function performOCR(imagePath) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            Tesseract.recognize(imagePath, 'urd', { logger: (info) => console.log(info) }).then(({ data: { text } }) => {
                resolve(text);
            }).catch((error) => {
                reject(error);
            });
        });
    });
}
class Router {
    static initializeRoutes(app) {
        app.use(express.static(path_1.default.join(__dirname, '..', '..', 'src', 'public')));
        app.use('/api/file', files_routes_1.default);
        app.use('/api/slider', main_slider_routes_1.default);
        app.use('/api/masters', masters_1.MasterRouts);
        app.use('/api/participant', participant_routes_1.default);
        app.use('/api/events', events_routes_1.default);
        app.use('/api/contact_us', contact_us_routes_1.default);
    }
}
exports.Router = Router;
