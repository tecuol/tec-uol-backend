"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterRouts = void 0;
const express_1 = require("express");
const stateCity_routes_1 = __importDefault(require("./stateCity.routes"));
const address_routes_1 = __importDefault(require("./address.routes"));
const participant_type_routes_1 = __importDefault(require("./participant-type.routes"));
const organization_routes_1 = __importDefault(require("./organization.routes"));
exports.MasterRouts = (0, express_1.Router)();
exports.MasterRouts.use('/sc', stateCity_routes_1.default);
exports.MasterRouts.use('/address', address_routes_1.default);
exports.MasterRouts.use('/participant-type', participant_type_routes_1.default);
exports.MasterRouts.use('/organization', organization_routes_1.default);
