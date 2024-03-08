import { NextFunction, Request, Response } from "express";

import { CreateOrUpdateResponse, createOrUpdate, dropdownList, getData, getDataList } from "../services/TECUOLLib";
import * as logger from "../services/logging.service";

import Emails from "../models/emails.model";
import { Sequelize } from "sequelize-typescript";
import { Server } from "../server";
import { sendmail } from "../services/mailer.service";
import { MailType } from "../utils/enum";
import { Transaction } from "sequelize";
import { Models } from "../models";
import { default_sender_reciver_emails } from "../utils/constent";


class ContactUsController {
    public static selfInstance: ContactUsController = null;

    public static getInstance() {
        if (ContactUsController.selfInstance) {
            return ContactUsController.selfInstance;
        }
        this.selfInstance = new ContactUsController();
        return this.selfInstance;
    }

    public async getList(req: Request, res: Response, next: NextFunction) {
        try {
            const search = [
                'subject',
                'body',
                'to',
                'from',
            ]
            await getDataList(req, res, Emails, search, {
                attributes: [
                    'id', 'subject', 'body', 'to', 'from', 'createdAt',
                    [Sequelize.literal(`FIND_IN_SET('${req.user?.id}', readUserIds)`), 'isRead']
                ],
            })
        } catch (error: any) {
            logger.logError(error, req)
            res.send({
                status: 0,
                message: error.message
            })
        }
    }

    public async dropdown(req: Request, res: Response, next: NextFunction) {
        try {
            const search = [
                'subject',
                'body',
                'to',
                'from',
            ]
            await dropdownList({
                req: req,
                res: res,
                model: Emails,
                search_items: search
            })
        } catch (error: any) {
            logger.logError(error, req)
            res.send({
                status: 0,
                message: error.message
            })
        }

    }

    public async get(req: Request, res: Response, next: NextFunction) {
        try {
            await getData({
                req: req,
                res: res,
                model: Emails.addHook('afterFind', (event: Emails) => {
                    Emails.markReadByUser(event, req.user);
                }),
            })
        } catch (error: any) {
            logger.logError(error, req)
            res.send({
                status: 0,
                message: error.message
            })
        }
    }

    public async save(req: Request, res: Response, next: NextFunction) {
        const t: Transaction = await Models.connection.transaction();


        try {
            const body = {
                ...req.body, from: process.env.EMAIL_FROM, to: process.env.EMAIL_TO,
            }
            console.log({ body })
            const response: CreateOrUpdateResponse = await createOrUpdate({
                data: body,
                model: Emails,
                tran: t
            })
            await sendmail(body, MailType.CONTACTFORM)
            await sendmail({ ...body, to: body?.email }, MailType.CONTACTUS_REPLY)
            await t.commit()
            res.send({ ...response })
        } catch (error: any) {
            logger.logError(error, req)
            await t.rollback()
            res.send({
                status: 0,
                message: error?.message || error
            })
        }
    }
}
export default ContactUsController.getInstance()
