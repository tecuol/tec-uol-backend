"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const main_slider_controller_1 = __importDefault(require("../controllers/main_slider.controller"));
const MainSliderRouts = (0, express_1.Router)();
MainSliderRouts.get('/list', main_slider_controller_1.default.getList);
MainSliderRouts.post('/list', main_slider_controller_1.default.getList);
// MainSliderRouts.get('/', MainSliderController.get);
MainSliderRouts.post('/', main_slider_controller_1.default.save);
MainSliderRouts.post('/order', main_slider_controller_1.default.changeOrderOfSliders);
MainSliderRouts.delete('/', main_slider_controller_1.default.delete);
exports.default = MainSliderRouts;
