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
const files_model_1 = __importDefault(require("../models/files.model"));
const events_model_1 = __importDefault(require("../models/events.model"));
const enum_1 = require("../utils/enum");
const participants_model_1 = __importDefault(require("../models/participants.model"));
const event_schedule_model_1 = __importDefault(require("../models/event_schedule.model"));
const event_participants_model_1 = __importDefault(require("../models/event_participants.model"));
const organization_model_1 = __importDefault(require("../models/masters/organization.model"));
const address_model_1 = __importDefault(require("../models/masters/address.model"));
const participant_type_model_1 = __importDefault(require("../models/masters/participant_type.model"));
const models_1 = require("../models");
class EventsController {
    static getInstance() {
        if (EventsController.selfInstance) {
            return EventsController.selfInstance;
        }
        this.selfInstance = new EventsController();
        return this.selfInstance;
    }
    getList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const search = [
                    'title',
                    'start_date',
                    'end_date',
                    'short_dis'
                ];
                yield (0, TECUOLLib_1.getDataList)(req, res, events_model_1.default, search, {
                    attributes: ['id', 'title', 'short_dis', 'start_date', 'end_date', 'venueIds', 'start_time', 'end_time', 'createdAt', 'url'],
                    include: [
                        {
                            model: files_model_1.default
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
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, TECUOLLib_1.getData)({
                    req: req,
                    res: res,
                    model: events_model_1.default,
                    include: [
                        {
                            model: event_participants_model_1.default,
                            include: [
                                {
                                    model: participants_model_1.default
                                },
                                {
                                    model: organization_model_1.default,
                                    attributes: ['name', 'id']
                                },
                                {
                                    model: address_model_1.default,
                                    attributes: ['full_address', 'id']
                                },
                                {
                                    model: participant_type_model_1.default,
                                    attributes: ['name', 'id']
                                }
                            ]
                        },
                        {
                            model: event_schedule_model_1.default
                        },
                        {
                            model: files_model_1.default
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
    save(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const t = yield models_1.Models.connection.transaction();
            try {
                const body = (0, TECUOLLib_1.mapIds)(req.body);
                let { participants, event_schedule, imageIds } = body;
                body.url = (0, TECUOLLib_1.convertToURL)(body === null || body === void 0 ? void 0 : body.title);
                const response = yield (0, TECUOLLib_1.createOrUpdate)({
                    data: body,
                    model: events_model_1.default,
                    tran: t,
                });
                if (response.status != enum_1.globalResponseCode.success) {
                    yield t.rollback();
                    logger.logError(response.error, req);
                    res.send(Object.assign({}, response));
                    return;
                }
                const parentId = (_a = response.data) === null || _a === void 0 ? void 0 : _a.id;
                console.log({ parentId }, "local");
                if (Array.isArray(participants) && participants.length > 0) {
                    const response = yield (0, TECUOLLib_1.createOrUpdate)({
                        data: participants,
                        model: event_participants_model_1.default,
                        tran: t,
                        parentKey: "eventId",
                        parentId: parentId,
                    });
                    if (response.status != enum_1.globalResponseCode.success) {
                        yield t.rollback();
                        logger.logError(response.error, req);
                        res.send(Object.assign({}, response));
                        return;
                    }
                }
                if (Array.isArray(event_schedule) && event_schedule.length > 0) {
                    const response = yield (0, TECUOLLib_1.createOrUpdate)({
                        data: event_schedule,
                        model: event_schedule_model_1.default,
                        tran: t,
                        parentKey: "eventId",
                        parentId: parentId
                    });
                    if (response.status != enum_1.globalResponseCode.success) {
                        yield t.rollback();
                        logger.logError(response.error, req);
                        res.send(Object.assign({}, response));
                        return;
                    }
                }
                yield t.commit();
                res.send(Object.assign(Object.assign({}, response), { data: {
                        id: (_b = req.body) === null || _b === void 0 ? void 0 : _b.id,
                        event_schedule,
                        participants
                    } }));
            }
            catch (error) {
                yield t.rollback();
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
                    model: events_model_1.default
                });
                res.send(Object.assign({}, response));
            }
            catch (error) {
                logger.logError(error, req);
            }
        });
    }
}
EventsController.selfInstance = null;
exports.default = EventsController.getInstance();
