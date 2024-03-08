import { NextFunction, Request, Response } from "express";
import City from "../../models/city.model";
import State from "../../models/state.model";
import { CreateOrUpdateResponse, createOrUpdate, deleteParmanently, dropdownList, getData, getDataList } from "../../services/TECUOLLib";
import * as logger from "../../services/logging.service";
import Address from "../../models/masters/address.model";
import ParticipantType from "../../models/masters/participant_type.model";


class ParticipantTypeController {
    public static selfInstance: ParticipantTypeController = null;

    public static getInstance() {
        if (ParticipantTypeController.selfInstance) {
            return ParticipantTypeController.selfInstance;
        }
        this.selfInstance = new ParticipantTypeController();
        return this.selfInstance;
    }

    public async getList(req: Request, res: Response, next: NextFunction) {
        try {
            const search = [
                'name',
                'discription',
            ]
            await getDataList(req, res, ParticipantType, search)
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
                'discription',
            ]
            await dropdownList({
                req: req,
                res: res,
                model: ParticipantType,
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
                model: ParticipantType,
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
            const response: CreateOrUpdateResponse = await createOrUpdate({
                data: req.body,
                model: ParticipantType
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
                model: ParticipantType
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
export default ParticipantTypeController.getInstance()