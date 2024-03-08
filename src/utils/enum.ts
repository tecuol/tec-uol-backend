declare global {
    namespace Express {
        interface User {
            id: number;
        }
    }
}



export enum globalConstant {
    success_create_message = 'Item Created Successfully',
    success_update_message = 'Item Updated Successfully',
    success_delete_message = 'Item Deleted Successfully',
    error_message = 'Something went wrong',
}

export enum globalResponseCode {
    success = 1,
    error = 0,
}

export enum globalStatus {
    active = 1,
    inactive = 0
}




export enum MailType {
    WELCOME = "welcome",
    EVENT_INVITATION = "eventInvitation",
    PARTICIPATION_CONFIRMATION = "participationConfirmation",
    CONTACTUS_REPLY = "contactUsReply",
    CONTACTFORM = "contact_form",
    INNOVATION_FUNDING_RESPONSE = "innovation_funding_response"
}

