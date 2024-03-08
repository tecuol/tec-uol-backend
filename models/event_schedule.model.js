"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var EventSchedule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const events_model_1 = __importDefault(require("./events.model"));
const participant_controller_1 = require("../controllers/participant.controller");
let EventSchedule = EventSchedule_1 = class EventSchedule extends sequelize_typescript_1.Model {
    static parseSpeakerData(results) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = results;
            //check if result have speakerIds key
            if (!(results === null || results === void 0 ? void 0 : results.hasOwnProperty('speakerIds'))) {
                data = results.event_schedule;
            }
            if (Array.isArray(data)) {
                yield Promise.all(data.map((result) => __awaiter(this, void 0, void 0, function* () {
                    const speakerIds = result === null || result === void 0 ? void 0 : result.speakerIds;
                    if (speakerIds && typeof speakerIds === 'string') {
                        result.speakerIds = yield (0, participant_controller_1.getParticipants)(speakerIds);
                    }
                })));
            }
            else {
                const speakerIds = data === null || data === void 0 ? void 0 : data.speakerIds;
                if (speakerIds && typeof speakerIds === 'string') {
                    data.speakerIds = yield (0, participant_controller_1.getParticipants)(speakerIds);
                }
            }
        });
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING })
], EventSchedule.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING })
], EventSchedule.prototype, "discription", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT })
], EventSchedule.prototype, "speakerIds", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => events_model_1.default),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER })
], EventSchedule.prototype, "eventId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING })
], EventSchedule.prototype, "day", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING })
], EventSchedule.prototype, "day_no", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TIME })
], EventSchedule.prototype, "start_time", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TIME })
], EventSchedule.prototype, "end_time", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt
], EventSchedule.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt
], EventSchedule.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.AfterFind
], EventSchedule, "parseSpeakerData", null);
EventSchedule = EventSchedule_1 = __decorate([
    (0, sequelize_typescript_1.Table)({
        hooks: {
            afterFind: (event) => {
                console.log({ "asasasa": event });
                EventSchedule_1.parseSpeakerData(event);
            },
        }
    })
], EventSchedule);
exports.default = EventSchedule;
