"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const InternalServerError_1 = require("./errors/InternalServerError");
server_1.Server.initializeApp().then(() => {
    console.log(("  App is is running at http://localhost:%d in %s mode"), server_1.Server.app.get("port"), server_1.Server.app.get("env"));
}).catch((error) => {
    console.log("Error");
    throw new InternalServerError_1.InternalServerError(error.message);
});
