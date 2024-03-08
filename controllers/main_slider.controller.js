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
const TECUOLLib_1 = require("../services/TECUOLLib");
const logger = __importStar(require("../services/logging.service"));
const main_slider_model_1 = __importDefault(require("../models/main_slider.model"));
const files_model_1 = __importDefault(require("../models/files.model"));
const sequelize_1 = require("sequelize");
class MainSliderController {
    static getInstance() {
        if (MainSliderController.selfInstance) {
            return MainSliderController.selfInstance;
        }
        this.selfInstance = new MainSliderController();
        return this.selfInstance;
    }
    getList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield getSlidersList(req);
                res.send({
                    status: 1,
                    data: data
                });
            }
            catch (error) {
                logger.logError(error, req);
                res.send({
                    status: 0,
                    message: error.message
                });
            }
        });
    }
    save(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield (0, TECUOLLib_1.createOrUpdate)({
                    data: req.body,
                    model: main_slider_model_1.default
                });
                res.send(Object.assign({}, response));
            }
            catch (error) {
                logger.logError(error, req);
                res.send({
                    status: 0,
                    message: (error === null || error === void 0 ? void 0 : error.message) || error
                });
            }
        });
    }
    changeOrderOfSliders(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield (0, TECUOLLib_1.createOrUpdate)({
                    data: req.body,
                    model: main_slider_model_1.default
                });
                if (response.status == 1) {
                    const data = yield getSlidersList(req);
                    res.send(Object.assign(Object.assign({}, response), { data, message: "Order Changed Successfully" }));
                }
                else {
                    res.send(Object.assign({}, response));
                }
            }
            catch (error) {
                logger.logError(error, req);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield (0, TECUOLLib_1.deleteParmanently)({
                    data: req.query,
                    model: main_slider_model_1.default
                });
                res.send(Object.assign({}, response));
            }
            catch (error) {
                logger.logError(error, req);
            }
        });
    }
}
MainSliderController.selfInstance = null;
function getSlidersList(req) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield main_slider_model_1.default.findAll({
                    include: [{
                            model: files_model_1.default,
                            attributes: ['id', 'src']
                        }],
                    order: [['order_index', 'ASC']],
                    subQuery: false,
                    attributes: { include: [[sequelize_1.Sequelize.literal('\`image\`.\`src\`'), 'src']] }
                });
                resolve(data);
            }
            catch (error) {
                reject(error);
                logger.logError(error, req);
            }
        }));
    });
}
exports.default = MainSliderController.getInstance();
