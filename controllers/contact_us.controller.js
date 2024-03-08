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
const emails_model_1 = __importDefault(require("../models/emails.model"));
const sequelize_typescript_1 = require("sequelize-typescript");
const mailer_service_1 = require("../services/mailer.service");
const enum_1 = require("../utils/enum");
const models_1 = require("../models");
class ContactUsController {
    static getInstance() {
        if (ContactUsController.selfInstance) {
            return ContactUsController.selfInstance;
        }
        this.selfInstance = new ContactUsController();
        return this.selfInstance;
    }
    getList(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const search = [
                    'subject',
                    'body',
                    'to',
                    'from',
                ];
                yield (0, TECUOLLib_1.getDataList)(req, res, emails_model_1.default, search, {
                    attributes: [
                        'id', 'subject', 'body', 'to', 'from', 'createdAt',
                        [sequelize_typescript_1.Sequelize.literal(`FIND_IN_SET('${(_a = req.user) === null || _a === void 0 ? void 0 : _a.id}', readUserIds)`), 'isRead']
                    ],
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
                    'subject',
                    'body',
                    'to',
                    'from',
                ];
                yield (0, TECUOLLib_1.dropdownList)({
                    req: req,
                    res: res,
                    model: emails_model_1.default,
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
                    model: emails_model_1.default.addHook('afterFind', (event) => {
                        emails_model_1.default.markReadByUser(event, req.user);
                    }),
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
            const t = yield models_1.Models.connection.transaction();
            try {
                const body = Object.assign(Object.assign({}, req.body), { from: process.env.EMAIL_FROM, to: process.env.EMAIL_TO });
                console.log({ body });
                const response = yield (0, TECUOLLib_1.createOrUpdate)({
                    data: body,
                    model: emails_model_1.default,
                    tran: t
                });
                yield (0, mailer_service_1.sendmail)(body, enum_1.MailType.CONTACTFORM);
                yield (0, mailer_service_1.sendmail)(Object.assign(Object.assign({}, body), { to: body === null || body === void 0 ? void 0 : body.email }), enum_1.MailType.CONTACTUS_REPLY);
                yield t.commit();
                res.send(Object.assign({}, response));
            }
            catch (error) {
                logger.logError(error, req);
                yield t.rollback();
                res.send({
                    status: 0,
                    message: (error === null || error === void 0 ? void 0 : error.message) || error
                });
            }
        });
    }
}
ContactUsController.selfInstance = null;
exports.default = ContactUsController.getInstance();
