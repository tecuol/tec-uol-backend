import { NextFunction, Request, Response } from "express";
import City from "../models/city.model";
import Country from "../models/country.model";
import State from "../models/state.model";
import { CreateOrUpdateResponse, convertToURL, createOrUpdate, deleteParmanently, getData, getDataList, mapIds } from "../services/TECUOLLib";
import * as logger from "../services/logging.service";
import MainSlider from "../models/main_slider.model";
import Files from "../models/files.model";
import { Sequelize, Transaction } from "sequelize";
import Events from "../models/events.model";
import { Server } from "../server";
import { globalResponseCode, globalStatus } from "../utils/enum";
import Participants from "../models/participants.model";
import EventSchedule from "../models/event_schedule.model";
import EventParticipants from "../models/event_participants.model";
import Organization from "../models/masters/organization.model";
import Address from "../models/masters/address.model";
import ParticipantType from "../models/masters/participant_type.model";
import { Models } from "../models";


class EventsController {

    public static selfInstance: EventsController = null;

    public static getInstance() {
        if (EventsController.selfInstance) {
            return EventsController.selfInstance;
        }
        this.selfInstance = new EventsController();
        return this.selfInstance;
    }


    public async getList(req: Request, res: Response, next: NextFunction) {
        try {
            const search = [
                'title',
                'start_date',
                'end_date',
                'short_dis'
            ]
            await getDataList(req, res, Events, search, {
                attributes: ['id', 'title', 'short_dis', 'start_date', 'end_date', 'venueIds', 'start_time', 'end_time', 'createdAt', 'url'],
                include: [
                    {
                        model: Files
                    }
                ]
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
                model: Events,
                include: [
                    {
                        model: EventParticipants,
                        include: [
                            {
                                model: Participants
                            },
                            {
                                model: Organization,
                                attributes: ['name', 'id']
                            },
                            {
                                model: Address,
                                attributes: ['full_address', 'id']
                            },
                            {
                                model: ParticipantType,
                                attributes: ['name', 'id']
                            }
                        ]
                    },
                    {
                        model: EventSchedule
                    },
                    {
                        model: Files
                    }
                ]
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
            const body = mapIds(req.body);
            let { participants, event_schedule, imageIds } = body;
            body.url = convertToURL(body?.title)
            const response: CreateOrUpdateResponse = await createOrUpdate({
                data: body,
                model: Events,
                tran: t,
            })
            if (response.status != globalResponseCode.success) {
                await t.rollback();
                logger.logError(response.error, req)
                res.send({ ...response })
                return
            }
            const parentId = response.data?.id
            console.log({ parentId }, "local")
            if (Array.isArray(participants) && participants.length > 0) {
                const response: CreateOrUpdateResponse = await createOrUpdate({
                    data: participants,
                    model: EventParticipants,
                    tran: t,
                    parentKey: "eventId",
                    parentId: parentId,
                })

                if (response.status != globalResponseCode.success) {
                    await t.rollback();
                    logger.logError(response.error, req)
                    res.send({ ...response })
                    return
                }
            }

            if (Array.isArray(event_schedule) && event_schedule.length > 0) {
                const response: CreateOrUpdateResponse = await createOrUpdate({
                    data: event_schedule,
                    model: EventSchedule,
                    tran: t,
                    parentKey: "eventId",
                    parentId: parentId
                })
                if (response.status != globalResponseCode.success) {
                    await t.rollback();
                    logger.logError(response.error, req)
                    res.send({ ...response })
                    return
                }
            }
            await t.commit();
            res.send({
                ...response,
                data: {
                    id: req.body?.id,
                    event_schedule,
                    participants
                }
            })
        } catch (error: any) {
            await t.rollback();
            logger.logError(error, req)
            res.send({
                status: 0,
                message: error?.message || error
            })
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const response: CreateOrUpdateResponse = await deleteParmanently({
                data: req.query,
                model: Events
            })
            res.send({ ...response })
        } catch (error) {
            logger.logError(error, req)
        }
    }
}

export default EventsController.getInstance()