"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailType = exports.globalStatus = exports.globalResponseCode = exports.globalConstant = void 0;
var globalConstant;
(function (globalConstant) {
    globalConstant["success_create_message"] = "Item Created Successfully";
    globalConstant["success_update_message"] = "Item Updated Successfully";
    globalConstant["success_delete_message"] = "Item Deleted Successfully";
    globalConstant["error_message"] = "Something went wrong";
})(globalConstant = exports.globalConstant || (exports.globalConstant = {}));
var globalResponseCode;
(function (globalResponseCode) {
    globalResponseCode[globalResponseCode["success"] = 1] = "success";
    globalResponseCode[globalResponseCode["error"] = 0] = "error";
})(globalResponseCode = exports.globalResponseCode || (exports.globalResponseCode = {}));
var globalStatus;
(function (globalStatus) {
    globalStatus[globalStatus["active"] = 1] = "active";
    globalStatus[globalStatus["inactive"] = 0] = "inactive";
})(globalStatus = exports.globalStatus || (exports.globalStatus = {}));
var MailType;
(function (MailType) {
    MailType["WELCOME"] = "welcome";
    MailType["EVENT_INVITATION"] = "eventInvitation";
    MailType["PARTICIPATION_CONFIRMATION"] = "participationConfirmation";
    MailType["CONTACTUS_REPLY"] = "contactUsReply";
    MailType["CONTACTFORM"] = "contact_form";
    MailType["INNOVATION_FUNDING_RESPONSE"] = "innovation_funding_response";
})(MailType = exports.MailType || (exports.MailType = {}));
