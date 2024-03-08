"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const organization_controller_1 = __importDefault(require("../../controllers/masters/organization.controller"));
const OrganizationRouts = (0, express_1.Router)();
OrganizationRouts.post('/list', organization_controller_1.default.getList);
OrganizationRouts.post('/dropdown', organization_controller_1.default.dropdown);
OrganizationRouts.get('/', organization_controller_1.default.get);
OrganizationRouts.post('/', organization_controller_1.default.save);
OrganizationRouts.delete('/', organization_controller_1.default.delete);
exports.default = OrganizationRouts;
