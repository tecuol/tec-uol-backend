"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
let UserLogin = class UserLogin extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        comment: 'generated username',
        type: sequelize_typescript_1.DataType.STRING
    })
], UserLogin.prototype, "username", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING })
], UserLogin.prototype, "firebaseUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    })
], UserLogin.prototype, "deviceId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    })
], UserLogin.prototype, "deviceOS", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT
    })
], UserLogin.prototype, "authToken", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt
], UserLogin.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt
], UserLogin.prototype, "updatedAt", void 0);
UserLogin = __decorate([
    (0, sequelize_typescript_1.Table)({
        indexes: [
            {
                name: 'username',
                fields: ['username'],
                unique: true
            },
            {
                name: 'firebaseUID',
                fields: ['firebaseUID'],
                unique: true
            }
        ]
    })
], UserLogin);
exports.default = UserLogin;
