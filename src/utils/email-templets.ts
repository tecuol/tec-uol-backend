import { getCurrentDateTimeIST } from "../services/TECUOLLib";
import { MailType } from "./enum";

export function generateHTMLResponse(data: any, type: string) {
    switch (type) {
        case MailType.WELCOME:
            return {
                subject: "Welcome to Technology Enabling Center",
                html: generateWelcomeEmail(data.guestName)
            };
        case MailType.EVENT_INVITATION:
            return {
                subject: `Invitation to ${data.eventName}`,
                html: generateEventInvitation(data)
            };
        case MailType.PARTICIPATION_CONFIRMATION:
            return {
                subject: "Participation Form Confirmation",
                html: generateParticipationConfirmation(data)
            };
        case MailType.CONTACTUS_REPLY:
            return {
                subject: "Thank You for Contacting Us",
                html: generateContactUsReply()
            };
        case MailType.CONTACTFORM:
            return {
                subject: 'Mail from Contact-us Form of Website',
                html: generateContactFormHTML(data)
            }
        case MailType.INNOVATION_FUNDING_RESPONSE:
            return {
                subject: 'Innovation Funding Proposal From Website',
                html: generateInnovationFundingResponse(data)
            }
        default:
            throw new Error("Invalid response type");
    }
}

function generateWelcomeEmail(guestName: any) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Technology Enabling Center</title>
        </head>
        <body>
            <strong>Welcome to Technology Enabling Center, University of Ladakh!</strong>
            <p>We are excited to have you join our community. Our goal is to provide you with the best resources and support for your technological endeavors.</p>
            <p>If you have any questions or need assistance, feel free to reach out to us at [contact email].</p>
            <p>Thank you and best regards,<br>Technology Enabling Center Team</p>
        </body>
        </html>
    `;
}

function generateEventInvitation(data: any) {
    const { eventName, eventStartDate, eventEndDate, eventTime, eventLocation, acceptLink } = data;
    const dateRange = eventEndDate ? `${eventStartDate} - ${eventEndDate}` : eventStartDate;

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Invitation to ${eventName}</title>
        </head>
        <body>
            <strong>You're Invited to Our ${eventName} Event!</strong>
            <p>We're excited to invite you to our event where you can learn and connect with others.</p>
            <p>Date: ${dateRange}<br>
            ${eventTime ? `Time: ${eventTime}<br>` : ''}
            Location: ${eventLocation}</p>
            <p>Please click the following link to accept the invitation:</p>
            <a href="${acceptLink}">Accept Invitation</a>
            <p>We look forward to seeing you there!</p>
            <p>Best regards,<br>Technology Enabling Center Team</p>
        </body>
        </html>
    `;
}

function generateParticipationConfirmation(data: any) {
    const { participantName, eventName, eventStartDate, eventEndDate, eventTime, eventLocation } = data;
    const dateRange = eventEndDate ? `${eventStartDate} - ${eventEndDate}` : eventStartDate;

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Participation Form Confirmation</title>
        </head>
        <body>
            <strong>Thank You for Your Participation!</strong>
            <p>Hello ${participantName},</p>
            <p>Thank you for filling out the participation form for our event: <strong>${eventName}</strong></p>
            <p>We have received your submission and are excited to have you join us.</p>
            <p>Event Details:</p>
            <p>Date: ${dateRange}<br>
            ${eventTime ? `Time: ${eventTime}<br>` : ''}
            Location: ${eventLocation}</p>
            <p>If you have any questions or need further information, feel free to reach out to us at [contact email].</p>
            <p>We look forward to seeing you at the event!</p>
            <p>Best regards,<br>Technology Enabling Center Team</p>
        </body>
        </html>
    `;
}

function generateContactUsReply() {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You for Contacting Us</title>
        </head>
        <body>
            <strong>Thank You for Contacting Us!</strong>
            <p>We have received your inquiry and will get back to you as soon as possible.</p>
            <p>Best regards,<br>Technology Enabling Center Team</p>
        </body>
        </html>
    `;
}

function generateInnovationFundingResponse(data: any) {
    const { recipientName, proposalTitle, } = data;

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Innovation Funding Proposal Response</title>
        </head>
        <body>
            <p>Dear ${recipientName},</p>
            <p>Thank you for submitting your proposal titled <strong>${proposalTitle}</strong> for funding consideration.</p>
            <p>We appreciate your interest in innovation and your efforts in developing new ideas and products.</p>
            <p>Please be informed that our team will carefully review your proposal. If we find your idea or product worthy of funding, you will receive a response from us.</p>
            <p>If you have any questions or need further information, feel free to contact us.</p>
            <p>Best regards,<br>Technology Enabling Center Team</p>
        </body>
        </html>
    `;
}

function generateContactFormHTML(data: any) {
    const { name, email, phone, subject, body } = data;
    const currentDateTimeIST = getCurrentDateTimeIST();

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contact Form Submission</title>
        </head>
        <body>
            <h2>Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong> ${body}</p>
            <p><em>This message was sent on ${currentDateTimeIST} IST.</em></p>
        </body>
        </html>
    `;
}



