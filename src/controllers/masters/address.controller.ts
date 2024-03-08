import { NextFunction, Request, Response } from "express";
import City from "../../models/city.model";
import State from "../../models/state.model";
import { CreateOrUpdateResponse, createOrUpdate, deleteParmanently, dropdownList, getData, getDataList, mapIds } from "../../services/TECUOLLib";
import * as logger from "../../services/logging.service";
import Address from "../../models/masters/address.model";


class AddressController {
    public static selfInstance: AddressController = null;

    public static getInstance() {
        if (AddressController.selfInstance) {
            return AddressController.selfInstance;
        }
        this.selfInstance = new AddressController();
        return this.selfInstance;
    }

    public async getList(req: Request, res: Response, next: NextFunction) {
        try {
            const search = [
                'full_address',
                'pincode',
            ]
            await getDataList(req, res, Address, search, {
                include: [
                    {
                        model: State,
                        attributes: ['id', 'name']
                    },
                    {
                        model: City,
                        attributes: ['id', 'name']
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

    public async dropdown(req: Request, res: Response, next: NextFunction) {
        try {
            const search = [
                'full_address',
                'pincode',
            ]
            await dropdownList({
                req: req,
                res: res,
                model: Address,
                search_items: search,
                include: {
                    include: [
                        {
                            model: State,
                            attributes: ['id', 'name']
                        },
                        {
                            model: City,
                            attributes: ['id', 'name']
                        }
                    ]
                }
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
                model: Address,
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
            const body = mapIds(req?.body)
            console.log({ body })
            const response: CreateOrUpdateResponse = await createOrUpdate({
                data: body,
                model: Address
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
                model: Address
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
export default AddressController.getInstance()

export const getAddress = async (id_string: any) => {
    try {
        if (!id_string) {
            return null
        }
        id_string = id_string.split(",")
        return await Address.findAll({
            where: {
                id: id_string
            },
            include: [
                {
                    model: State,
                    attributes: ['id', 'name']
                },
                {
                    model: City,
                    attributes: ['id', 'name']
                }
            ]
        })
    } catch (error) {
        logger.logError(error)
    }

}