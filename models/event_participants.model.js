"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const participants_model_1 = __importDefault(require("./participants.model"));
const events_model_1 = __importDefault(require("./events.model"));
const participant_type_model_1 = __importDefault(require("./masters/participant_type.model"));
const address_model_1 = __importDefault(require("./masters/address.model"));
const organization_model_1 = __importDefault(require("./masters/organization.model"));
let EventParticipants = class EventParticipants extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT })
], EventParticipants.prototype, "topic", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => participants_model_1.default),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER })
], EventParticipants.prototype, "participantId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => participants_model_1.default)
], EventParticipants.prototype, "participant", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => events_model_1.default),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER })
], EventParticipants.prototype, "eventId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => participant_type_model_1.default),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER })
], EventParticipants.prototype, "attendAsId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => participant_type_model_1.default)
], EventParticipants.prototype, "attendAs", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => address_model_1.default),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER })
], EventParticipants.prototype, "attendVenuId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => address_model_1.default)
], EventParticipants.prototype, "attendVenu", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => organization_model_1.default),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER })
], EventParticipants.prototype, "organizationId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => organization_model_1.default)
], EventParticipants.prototype, "organization", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER })
], EventParticipants.prototype, "typeId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT })
], EventParticipants.prototype, "attachmentsIds", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt
], EventParticipants.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt
], EventParticipants.prototype, "updatedAt", void 0);
EventParticipants = __decorate([
    sequelize_typescript_1.Table
], EventParticipants);
exports.default = EventParticipants;
