import { NextFunction, Request, Response } from "express";
import City from "../models/city.model";
import Country from "../models/country.model";
import State from "../models/state.model";
import { dropdownList } from "../services/TECUOLLib";
import { logError } from "../services/logging.service";


class CountryStateCityController {
    public static selfInstance: CountryStateCityController = null;

    public static getInstance() {
        if (CountryStateCityController.selfInstance) {
            return CountryStateCityController.selfInstance;
        }
        this.selfInstance = new CountryStateCityController();
        return this.selfInstance;
    }


    public async getCountry(req: Request, res: Response, next: NextFunction) {
        await Country.findAll().then((data: any) => {
            res.send({
                status: 1,
                countries: data
            })
        }).catch((err: any) => {
            res.send({
                status: -1,
                error_message: err.message
            })
        })
    }

    public async stateDropdown(req: Request, res: Response, next: NextFunction) {
        try {
            const search = [
                'name',
                'code',
            ]
            await dropdownList({
                req: req,
                res: res,
                model: State,
                search_items: search
            })
        } catch (error: any) {
            logError(error, req)
            res.send({
                status: 0,
                message: error.message
            })
        }
    }

    public async cityDropdown(req: Request, res: Response, next: NextFunction) {
        try {
            const search = [
                'name',
                'code',
            ]
            await dropdownList({
                req: req,
                res: res,
                model: City,
                search_items: search
            })
        } catch (error: any) {
            logError(error, req)
            res.send({
                status: 0,
                message: error.message
            })
        }
    }
}
export default CountryStateCityController.getInstance()