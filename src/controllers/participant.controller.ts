import { NextFunction, Request, Response } from "express";
import City from "../models/city.model";
import State from "../models/state.model";
import { CreateOrUpdateResponse, createOrUpdate, deleteParmanently, dropdownList, getData, getDataList, mapIds, saveIfNotExist } from "../services/TECUOLLib";
import * as logger from "../services/logging.service";
import Address from "../models/masters/address.model";
import ParticipantType from "../models/masters/participant_type.model";
import Participants from "../models/participants.model";
import Organization from "../models/masters/organization.model";


class ParticipantController {
    public static selfInstance: ParticipantController = null;

    public static getInstance() {
        if (ParticipantController.selfInstance) {
            return ParticipantController.selfInstance;
        }
        this.selfInstance = new ParticipantController();
        return this.selfInstance;
    }

    public async getList(req: Request, res: Response, next: NextFunction) {
        try {
            const search = [
                'name',
                'mobile',
                'email',
                'title',

            ]
            await getDataList(req, res, Participants, search)
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
                'name',
                'mobile',
                'email',
                'title',
            ]
            await dropdownList({
                req: req,
                res: res,
                model: Participants,
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
                model: Participants,
                include: [
                    {
                        model: Organization,
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
        try {
            console.log('Before save', {
                req: req.body
            })
            await saveIfNotExist({
                req,
                model: Organization,
                getKey: 'organization'
            })
            console.log('after save before map', {
                req: req.body
            })

            const response: CreateOrUpdateResponse = await createOrUpdate({
                data: req.body,
                model: Participants
            })

            res.send({ ...response })
        } catch (error: any) {
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
                model: Participants
            })
            res.send({ ...response })
        } catch (error: any) {
            logger.logError(error, req)
            res.send({
                status: 0,
                message: error?.message || error
            })
        }
    }
}
export default ParticipantController.getInstance()

export const getParticipants = async (id_string: any) => {
    try {
        if (!id_string) {
            return null
        }
        id_string = id_string.split(",")
        return await Participants.findAll({
            where: {
                id: id_string
            }
        })
    } catch (error) {
        logger.logError(error)
    }

}