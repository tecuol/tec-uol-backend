import { generateHTMLResponse } from "../utils/email-templets";
import { MailType } from "../utils/enum";
import * as nodemailer from "nodemailer"
import nodemailerSendgrid from "nodemailer-sendgrid";
import { logError } from "./logging.service";

export const sendmail = (data: any, emailType: MailType) => {

  let mailer_Api_key: any
  let from_mail: string
  let to_mail: string

  from_mail = `'TEC UOL <${process.env.EMAIL_FROM}>'`
  to_mail = process.env.EMAIL_TO
  if (data?.to) {
    to_mail = data.to
  }
  mailer_Api_key = process.env.SENDGRID_KEY;
  return new Promise((resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport(nodemailerSendgrid({
        apiKey: mailer_Api_key
      }));

      // send mail with defined transport object
      let response = generateHTMLResponse(data, emailType)
      transporter.sendMail({
        from: from_mail,// sender address 
        to: to_mail, // list of receivers
        subject: response?.subject, // Subject line
        text: "Hello world?", // plain text body
        html: response?.html
      }).then((info) => {
        console.log("Message sent: %s", info?.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        resolve(info?.messageId)
      }).catch((e: any) => {
        console.log(e)
        logError(e)
        reject(e)
      });
    } catch (e) {
      console.log(e)
      logError(e)
      reject(e)
    }
  })
}



