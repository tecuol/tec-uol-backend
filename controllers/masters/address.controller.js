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
exports.getAddress = void 0;
const city_model_1 = __importDefault(require("../../models/city.model"));
const state_model_1 = __importDefault(require("../../models/state.model"));
const TECUOLLib_1 = require("../../services/TECUOLLib");
const logger = __importStar(require("../../services/logging.service"));
const address_model_1 = __importDefault(require("../../models/masters/address.model"));
class AddressController {
    static getInstance() {
        if (AddressController.selfInstance) {
            return AddressController.selfInstance;
        }
        this.selfInstance = new AddressController();
        return this.selfInstance;
    }
    getList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const search = [
                    'full_address',
                    'pincode',
                ];
                yield (0, TECUOLLib_1.getDataList)(req, res, address_model_1.default, search, {
                    include: [
                        {
                            model: state_model_1.default,
                            attributes: ['id', 'name']
                        },
                        {
                            model: city_model_1.default,
                            attributes: ['id', 'name']
                        }
                    ]
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
    dropdown(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const search = [
                    'full_address',
                    'pincode',
                ];
                yield (0, TECUOLLib_1.dropdownList)({
                    req: req,
                    res: res,
                    model: address_model_1.default,
                    search_items: search,
                    include: {
                        include: [
                            {
                                model: state_model_1.default,
                                attributes: ['id', 'name']
                            },
                            {
                                model: city_model_1.default,
                                attributes: ['id', 'name']
                            }
                        ]
                    }
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
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, TECUOLLib_1.getData)({
                    req: req,
                    res: res,
                    model: address_model_1.default,
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
                const body = (0, TECUOLLib_1.mapIds)(req === null || req === void 0 ? void 0 : req.body);
                console.log({ body });
                const response = yield (0, TECUOLLib_1.createOrUpdate)({
                    data: body,
                    model: address_model_1.default
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
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield (0, TECUOLLib_1.deleteParmanently)({
                    data: req.query,
                    model: address_model_1.default
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
}
AddressController.selfInstance = null;
exports.default = AddressController.getInstance();
const getAddress = (id_string) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!id_string) {
            return null;
        }
        id_string = id_string.split(",");
        return yield address_model_1.default.findAll({
            where: {
                id: id_string
            },
            include: [
                {
                    model: state_model_1.default,
                    attributes: ['id', 'name']
                },
                {
                    model: city_model_1.default,
                    attributes: ['id', 'name']
                }
            ]
        });
    }
    catch (error) {
        logger.logError(error);
    }
});
exports.getAddress = getAddress;
