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
const city_model_1 = __importDefault(require("../city.model"));
const state_model_1 = __importDefault(require("../state.model"));
let Address = class Address extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING })
], Address.prototype, "area", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING })
], Address.prototype, "landmark", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING })
], Address.prototype, "pincode", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => state_model_1.default),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER })
], Address.prototype, "stateId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => state_model_1.default)
], Address.prototype, "state", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => city_model_1.default),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER })
], Address.prototype, "cityId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => city_model_1.default)
], Address.prototype, "city", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING })
], Address.prototype, "full_address", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt
], Address.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt
], Address.prototype, "updatedAt", void 0);
Address = __decorate([
    sequelize_typescript_1.Table
], Address);
exports.default = Address;
