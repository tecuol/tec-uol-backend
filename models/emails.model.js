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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const emails_read_status_model_1 = __importDefault(require("./emails_read_status.model"));
const TECUOLLib_1 = require("../services/TECUOLLib");
let Emails = class Emails extends sequelize_typescript_1.Model {
    static markReadByUser(result, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user === null || user === void 0 ? void 0 : user.id) {
                (0, TECUOLLib_1.createOrUpdate)({
                    data: {
                        emailId: result.id,
                        readUserIds: sequelize_typescript_1.Sequelize.literal(`CASE WHEN FIND_IN_SET('${user === null || user === void 0 ? void 0 : user.id}', readUserIds) = 0 Then CONCAT(readUserIds, ',${user === null || user === void 0 ? void 0 : user.id}') ELSE readUserIds END`)
                    },
                    model: emails_read_status_model_1.default,
                    idKey: 'emailId'
                });
            }
        });
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING })
], Emails.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING })
], Emails.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING })
], Emails.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT })
], Emails.prototype, "to", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT })
], Emails.prototype, "from", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING })
], Emails.prototype, "subject", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT })
], Emails.prototype, "body", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT })
], Emails.prototype, "attachments", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt
], Emails.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt
], Emails.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.AfterFind
], Emails, "markReadByUser", null);
Emails = __decorate([
    sequelize_typescript_1.Table
], Emails);
exports.default = Emails;
