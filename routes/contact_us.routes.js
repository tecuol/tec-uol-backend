"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_us_controller_1 = __importDefault(require("../controllers/contact_us.controller"));
const CountactUsRouts = (0, express_1.Router)();
CountactUsRouts.post('/list', contact_us_controller_1.default.getList);
CountactUsRouts.post('/dropdown', contact_us_controller_1.default.dropdown);
CountactUsRouts.get('/', contact_us_controller_1.default.get);
CountactUsRouts.post('/get', contact_us_controller_1.default.get);
CountactUsRouts.post('/', contact_us_controller_1.default.save);
exports.default = CountactUsRouts;
