import { NextFunction, Request, Response } from "express";
import { CreateOrUpdateResponse, createOrUpdate, deleteParmanently, dropdownList, getData, getDataList } from "../../services/TECUOLLib";
import * as logger from "../../services/logging.service";
import Organization from "../../models/masters/organization.model";


class OrganizationController {
    public static selfInstance: OrganizationController = null;

    public static getInstance() {
        if (OrganizationController.selfInstance) {
            return OrganizationController.selfInstance;
        }
        this.selfInstance = new OrganizationController();
        return this.selfInstance;
    }

    public async getList(req: Request, res: Response, next: NextFunction) {
        try {
            const search = [
                'name',
                'discription',
            ]
            await getDataList(req, res, Organization, search)
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
                model: Organization,
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
                model: Organization,
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
                model: Organization
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
                model: Organization
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
export default OrganizationController.getInstance()