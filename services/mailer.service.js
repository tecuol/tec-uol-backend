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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendmail = void 0;
const email_templets_1 = require("../utils/email-templets");
const nodemailer = __importStar(require("nodemailer"));
const nodemailer_sendgrid_1 = __importDefault(require("nodemailer-sendgrid"));
const logging_service_1 = require("./logging.service");
const sendmail = (data, emailType) => {
    let mailer_Api_key;
    let from_mail;
    let to_mail;
    from_mail = `'TEC UOL <${process.env.EMAIL_FROM}>'`;
    to_mail = process.env.EMAIL_TO;
    if (data === null || data === void 0 ? void 0 : data.to) {
        to_mail = data.to;
    }
    mailer_Api_key = process.env.SENDGRID_KEY;
    return new Promise((resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport((0, nodemailer_sendgrid_1.default)({
                apiKey: mailer_Api_key
            }));
            // send mail with defined transport object
            let response = (0, email_templets_1.generateHTMLResponse)(data, emailType);
            transporter.sendMail({
                from: from_mail,
                to: to_mail,
                subject: response === null || response === void 0 ? void 0 : response.subject,
                text: "Hello world?",
                html: response === null || response === void 0 ? void 0 : response.html
            }).then((info) => {
                console.log("Message sent: %s", info === null || info === void 0 ? void 0 : info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                resolve(info === null || info === void 0 ? void 0 : info.messageId);
            }).catch((e) => {
                console.log(e);
                (0, logging_service_1.logError)(e);
                reject(e);
            });
        }
        catch (e) {
            console.log(e);
            (0, logging_service_1.logError)(e);
            reject(e);
        }
    });
};
exports.sendmail = sendmail;
