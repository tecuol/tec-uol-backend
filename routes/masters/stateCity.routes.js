"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const countryStateCity_controller_1 = __importDefault(require("../../controllers/countryStateCity.controller"));
const StateCityRouts = (0, express_1.Router)();
StateCityRouts.post('/state_dropdown', countryStateCity_controller_1.default.stateDropdown);
StateCityRouts.post('/city_dropdown', countryStateCity_controller_1.default.cityDropdown);
exports.default = StateCityRouts;
