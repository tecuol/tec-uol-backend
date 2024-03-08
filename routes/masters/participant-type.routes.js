"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const participant_type_controller_1 = __importDefault(require("../../controllers/masters/participant_type.controller"));
const ParticipantTypeRouts = (0, express_1.Router)();
ParticipantTypeRouts.post('/list', participant_type_controller_1.default.getList);
ParticipantTypeRouts.post('/dropdown', participant_type_controller_1.default.dropdown);
ParticipantTypeRouts.get('/', participant_type_controller_1.default.get);
ParticipantTypeRouts.post('/', participant_type_controller_1.default.save);
ParticipantTypeRouts.delete('/', participant_type_controller_1.default.delete);
exports.default = ParticipantTypeRouts;
