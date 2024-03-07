"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const address_controller_1 = __importDefault(require("../../controllers/masters/address.controller"));
const AddressRouts = (0, express_1.Router)();
AddressRouts.post('/list', address_controller_1.default.getList);
AddressRouts.post('/dropdown', address_controller_1.default.dropdown);
AddressRouts.get('/', address_controller_1.default.get);
AddressRouts.post('/', address_controller_1.default.save);
AddressRouts.delete('/', address_controller_1.default.delete);
exports.default = AddressRouts;
