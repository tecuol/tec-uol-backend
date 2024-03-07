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
exports.Models = void 0;
const fs = require('fs');
const path = require('path');
const sequelize_typescript_1 = require("sequelize-typescript");
const city_model_1 = __importDefault(require("./city.model"));
const state_model_1 = __importDefault(require("./state.model"));
const logging_service_1 = require("../services/logging.service");
const constent_1 = require("../utils/constent");
/**
 *  All models must be imported from this file or else they will not be registered with Sequelize
 */
class Models {
    constructor(config) {
        this.sequelize = new sequelize_typescript_1.Sequelize(config);
        Models.connection = this.sequelize;
        this.checkAndCreateDatabase();
    }
    initModels() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("done Database Model");
            this.sequelize.addModels(this.getModels());
            return yield this.sequelize
                .sync({
                alter: true
                // force: true
            })
                .then((data) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const stateCount = yield state_model_1.default.count();
                    if (stateCount == 0) {
                        yield state_model_1.default.bulkCreate(constent_1.default_state_list);
                    }
                    const cityCount = yield city_model_1.default.count();
                    if (cityCount == 0) {
                        yield city_model_1.default.bulkCreate(constent_1.default_citie_list);
                    }
                }
                catch (error) {
                    (0, logging_service_1.logError)(error);
                }
            })).catch((err) => {
                console.log(err);
                return;
            });
        });
    }
    getModels() {
        const models = [];
        // Function to recursively search for models in directories
        const searchModels = (directory) => {
            fs.readdirSync(directory).forEach((file) => {
                const fullPath = path.join(directory, file);
                if (fs.statSync(fullPath).isDirectory()) {
                    // If the item is a directory, recursively search for models
                    searchModels(fullPath);
                }
                else if (file.endsWith('model.js')) {
                    // If the file is a model, require it and add to the models array
                    const model = require(fullPath);
                    models.push(model.default);
                }
            });
        };
        // Start searching for models in the provided directory
        searchModels(__dirname);
        return models;
    }
    checkAndCreateDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            let q;
            try {
                console.log("Database create function calleed ", process.env.DB_NAME);
                // Attempt to connect to the existing database
                q = yield this.sequelize.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
                console.log({ q });
                console.log('Database already exists.');
            }
            catch (error) {
                console.log({ q });
                console.log("Dum Error ", error);
                // Other connection errors
                console.error('Error connecting to database:', error);
                throw error;
            }
        });
    }
}
exports.Models = Models;
