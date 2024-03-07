"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const sequelizeConfig = __importStar(require("./sequelize"));
const index_1 = require("./models/index");
const routes_1 = require("./routes");
const morgan = require("morgan");
const InternalServerError_1 = require("./errors/InternalServerError");
const dotenv = __importStar(require("dotenv"));
const path = require("path");
class Server {
    constructor() {
    }
    static initializeApp() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("env Done");
                dotenv.config({ path: path.join(__dirname, '../.env') });
                Server.app = (0, express_1.default)();
                console.log("express Done");
                // Configure application
                Server.configureApp();
                console.log("config Done");
                Server.initializeDatabase();
                console.log("db Done");
                Server.initializeAuth();
                Server.initializeRoles();
                // Initialize Routes
                routes_1.Router.initializeRoutes(Server.app);
                return Server.app.listen(Server.app.get("port"));
            }
            catch (error) {
                console.log("Error In Server new");
                console.log(error);
                throw new InternalServerError_1.InternalServerError("Error in Running The Server");
            }
        });
    }
    static initializeDatabase() {
        console.log("Database config");
        const models = new index_1.Models(sequelizeConfig.default);
        models.initModels().then((data) => {
            Server.sq = data;
        });
        return Server.sq;
    }
    static initializeAuth() {
        console.log("Auth");
        // Server.app.use(passport.initialize());
        // Auth.serializeUser();
        // Auth.useBasicStrategy();
        // Auth.useBearerStrategy();
        // Auth.useLocalStrategy();
    }
    static initializeRoles() {
        // Roles.buildRoles();
        // Server.app.use(Roles.middleware());
    }
    static configureApp() {
        console.log("Database config");
        // all environments
        Server.app.set("port", process.env.PORT || 3000);
        Server.app.use(bodyParser.urlencoded({ extended: true }));
        Server.app.use(bodyParser.json());
        Server.app.use((req, res, next) => {
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');
            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            next();
        });
        Server.app.use(morgan('dev', {
            skip: function (req, res) {
                return res.statusCode < 400;
            }, stream: process.stderr
        }));
        Server.app.use(morgan('dev', {
            skip: function (req, res) {
                return res.statusCode >= 400;
            }, stream: process.stdout
        }));
    }
}
exports.Server = Server;
