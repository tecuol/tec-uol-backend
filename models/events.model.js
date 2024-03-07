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
var Events_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const files_model_1 = __importDefault(require("./files.model"));
const event_participants_model_1 = __importDefault(require("./event_participants.model"));
const event_schedule_model_1 = __importDefault(require("./event_schedule.model"));
const address_controller_1 = require("../controllers/masters/address.controller");
const file_controller_1 = require("../controllers/file.controller");
let Events = Events_1 = class Events extends sequelize_typescript_1.Model {
    static parseVenueData(results) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Array.isArray(results)) {
                yield Promise.all(results.map((result) => __awaiter(this, void 0, void 0, function* () {
                    const venueIds = result === null || result === void 0 ? void 0 : result.venueIds;
                    if (venueIds && typeof venueIds === 'string') {
                        result.venueIds = yield (0, address_controller_1.getAddress)(venueIds);
                    }
                })));
            }
            else {
                const venueIds = results === null || results === void 0 ? void 0 : results.venueIds;
                if (venueIds && typeof venueIds === 'string') {
                    results.venueIds = yield (0, address_controller_1.getAddress)(venueIds);
                }
            }
        });
    }
    static parseImagesData(results) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Array.isArray(results)) {
                yield Promise.all(results.map((result) => __awaiter(this, void 0, void 0, function* () {
                    const imageIds = result === null || result === void 0 ? void 0 : result.imageIds;
                    if (imageIds && typeof imageIds === 'string') {
                        result.imageIds = yield (0, file_controller_1.getImages)(imageIds);
                    }
                })));
            }
            else {
                const imageIds = results === null || results === void 0 ? void 0 : results.imageIds;
                if (imageIds && typeof imageIds === 'string') {
                    results.imageIds = yield (0, file_controller_1.getImages)(imageIds);
                }
            }
        });
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING })
], Events.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING })
], Events.prototype, "venueIds", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT })
], Events.prototype, "short_dis", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING })
], Events.prototype, "url", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT })
], Events.prototype, "event_dic", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, defaultValue: 'Speakers' })
], Events.prototype, "speakers_title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT })
], Events.prototype, "speakers_dic", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => event_participants_model_1.default, {
        onDelete: 'CASCADE'
    })
], Events.prototype, "participants", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT })
], Events.prototype, "event_schedule_dic", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => event_schedule_model_1.default, {
        onDelete: 'CASCADE'
    })
], Events.prototype, "event_schedule", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => files_model_1.default),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER })
], Events.prototype, "primaryImageId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => files_model_1.default)
], Events.prototype, "primaryImage", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING })
], Events.prototype, "imageIds", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, defaultValue: 0 })
], Events.prototype, "event_status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE })
], Events.prototype, "start_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TIME })
], Events.prototype, "start_time", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE })
], Events.prototype, "end_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TIME })
], Events.prototype, "end_time", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt
], Events.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt
], Events.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.AfterFind
], Events, "parseVenueData", null);
__decorate([
    sequelize_typescript_1.AfterFind
], Events, "parseImagesData", null);
Events = Events_1 = __decorate([
    (0, sequelize_typescript_1.Table)({
        hooks: {
            afterFind: (event, options) => {
                Events_1.parseVenueData(event);
                Events_1.parseImagesData(event);
                event_schedule_model_1.default.parseSpeakerData(event);
            },
        },
        indexes: [
            {
                name: 'Title_',
                fields: ['url'],
                unique: true
            },
            {
                name: 'Title',
                fields: ['title'],
                unique: true
            },
        ]
    })
], Events);
exports.default = Events;
