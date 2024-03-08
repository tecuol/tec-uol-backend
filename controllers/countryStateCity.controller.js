"use strict";
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
const city_model_1 = __importDefault(require("../models/city.model"));
const country_model_1 = __importDefault(require("../models/country.model"));
const state_model_1 = __importDefault(require("../models/state.model"));
const TECUOLLib_1 = require("../services/TECUOLLib");
const logging_service_1 = require("../services/logging.service");
class CountryStateCityController {
    static getInstance() {
        if (CountryStateCityController.selfInstance) {
            return CountryStateCityController.selfInstance;
        }
        this.selfInstance = new CountryStateCityController();
        return this.selfInstance;
    }
    getCountry(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield country_model_1.default.findAll().then((data) => {
                res.send({
                    status: 1,
                    countries: data
                });
            }).catch((err) => {
                res.send({
                    status: -1,
                    error_message: err.message
                });
            });
        });
    }
    stateDropdown(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const search = [
                    'name',
                    'code',
                ];
                yield (0, TECUOLLib_1.dropdownList)({
                    req: req,
                    res: res,
                    model: state_model_1.default,
                    search_items: search
                });
            }
            catch (error) {
                (0, logging_service_1.logError)(error, req);
                res.send({
                    status: 0,
                    message: error.message
                });
            }
        });
    }
    cityDropdown(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const search = [
                    'name',
                    'code',
                ];
                yield (0, TECUOLLib_1.dropdownList)({
                    req: req,
                    res: res,
                    model: city_model_1.default,
                    search_items: search
                });
            }
            catch (error) {
                (0, logging_service_1.logError)(error, req);
                res.send({
                    status: 0,
                    message: error.message
                });
            }
        });
    }
}
CountryStateCityController.selfInstance = null;
exports.default = CountryStateCityController.getInstance();
