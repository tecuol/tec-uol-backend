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
const files_model_1 = __importDefault(require("./files.model"));
let MainSlider = class MainSlider extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT })
], MainSlider.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER })
], MainSlider.prototype, "order_index", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT })
], MainSlider.prototype, "caption", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => files_model_1.default),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER })
], MainSlider.prototype, "imageId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => files_model_1.default)
], MainSlider.prototype, "image", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt
], MainSlider.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt
], MainSlider.prototype, "updatedAt", void 0);
MainSlider = __decorate([
    sequelize_typescript_1.Table
], MainSlider);
exports.default = MainSlider;
