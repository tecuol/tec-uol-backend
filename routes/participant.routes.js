"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const participant_controller_1 = __importDefault(require("../controllers/participant.controller"));
const ParticipantRouts = (0, express_1.Router)();
ParticipantRouts.post('/list', participant_controller_1.default.getList);
ParticipantRouts.post('/dropdown', participant_controller_1.default.dropdown);
ParticipantRouts.get('/', participant_controller_1.default.get);
ParticipantRouts.post('/get', participant_controller_1.default.get);
ParticipantRouts.post('/', participant_controller_1.default.save);
ParticipantRouts.delete('/', participant_controller_1.default.delete);
exports.default = ParticipantRouts;
