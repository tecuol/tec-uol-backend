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
const TECUOLLib_1 = require("../../services/TECUOLLib");
const logger = __importStar(require("../../services/logging.service"));
const organization_model_1 = __importDefault(require("../../models/masters/organization.model"));
class OrganizationController {
    static getInstance() {
        if (OrganizationController.selfInstance) {
            return OrganizationController.selfInstance;
        }
        this.selfInstance = new OrganizationController();
        return this.selfInstance;
    }
    getList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const search = [
                    'name',
                    'discription',
                ];
                yield (0, TECUOLLib_1.getDataList)(req, res, organization_model_1.default, search);
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
                    'name',
                    'discription',
                ];
                yield (0, TECUOLLib_1.dropdownList)({
                    req: req,
                    res: res,
                    model: organization_model_1.default,
                    search_items: search
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
                    model: organization_model_1.default,
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
                    model: organization_model_1.default
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
                    model: organization_model_1.default
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
OrganizationController.selfInstance = null;
exports.default = OrganizationController.getInstance();
