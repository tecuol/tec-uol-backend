"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const events_controller_1 = __importDefault(require("../controllers/events.controller"));
const EventsRouts = (0, express_1.Router)();
EventsRouts.post('/list', events_controller_1.default.getList);
EventsRouts.get('/', events_controller_1.default.get);
EventsRouts.post('/get', events_controller_1.default.get);
EventsRouts.post('/', events_controller_1.default.save);
EventsRouts.delete('/', events_controller_1.default.delete);
exports.default = EventsRouts;
