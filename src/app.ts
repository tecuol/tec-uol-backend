import { Server } from "./server";
import {InternalServerError} from "./errors/InternalServerError"

Server.initializeApp().then(() => {
    console.log(("  App is is running at http://localhost:%d in %s mode"), Server.app.get("port"), Server.app.get("env"));
}).catch((error:any)=>{
    console.log("Error")
    throw new InternalServerError(error.message);
    
});