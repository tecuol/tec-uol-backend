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
const state_model_1 = __importDefault(require("./state.model"));
let City = class City extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING })
], City.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING })
], City.prototype, "code", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => state_model_1.default),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER })
], City.prototype, "stateId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => state_model_1.default)
], City.prototype, "state", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt
], City.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt
], City.prototype, "updatedAt", void 0);
City = __decorate([
    sequelize_typescript_1.Table
], City);
exports.default = City;
