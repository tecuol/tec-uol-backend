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
const emails_model_1 = __importDefault(require("./emails.model"));
let EmailStatus = class EmailStatus extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => emails_model_1.default),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER })
], EmailStatus.prototype, "emailId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => emails_model_1.default)
], EmailStatus.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING })
], EmailStatus.prototype, "readUserIds", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt
], EmailStatus.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt
], EmailStatus.prototype, "updatedAt", void 0);
EmailStatus = __decorate([
    sequelize_typescript_1.Table
], EmailStatus);
exports.default = EmailStatus;
