import { NextFunction, Request, Response } from "express";
import City from "../models/city.model";
import Country from "../models/country.model";
import State from "../models/state.model";
import { CreateOrUpdateResponse, createOrUpdate, deleteParmanently } from "../services/TECUOLLib";
import * as logger from "../services/logging.service";
import MainSlider from "../models/main_slider.model";
import Files from "../models/files.model";
import { Sequelize } from "sequelize";


class MainSliderController {
    public static selfInstance: MainSliderController = null;

    public static getInstance() {
        if (MainSliderController.selfInstance) {
            return MainSliderController.selfInstance;
        }
        this.selfInstance = new MainSliderController();
        return this.selfInstance;
    }


    public async getList(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await getSlidersList(req)
            res.send({
                status: 1,
                data: data
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
                model: MainSlider
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

    public async changeOrderOfSliders(req: Request, res: Response, next: NextFunction) {
        try {
            const response: CreateOrUpdateResponse = await createOrUpdate({
                data: req.body,
                model: MainSlider
            })
            if (response.status == 1) {
                const data = await getSlidersList(req)
                res.send({ ...response, data, message: "Order Changed Successfully" })
            } else {
                res.send({ ...response })
            }
        } catch (error) {
            logger.logError(error, req)
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const response: CreateOrUpdateResponse = await deleteParmanently({
                data: req.query,
                model: MainSlider
            })
            res.send({ ...response })
        } catch (error) {
            logger.logError(error, req)
        }
    }
}

async function getSlidersList(req: any) {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await MainSlider.findAll({
                include: [{
                    model: Files,
                    attributes: ['id', 'src']
                }],
                order: [['order_index', 'ASC']],
                subQuery: false,
                attributes: { include: [[Sequelize.literal('\`image\`.\`src\`'), 'src']] }
            })
            resolve(data)
        } catch (error) {
            reject(error)
            logger.logError(error, req)
        }
    })
}
export default MainSliderController.getInstance()