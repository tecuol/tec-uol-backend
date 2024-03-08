const fs = require('fs');
const path = require('path');

import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import City from './city.model';

import State from './state.model';
import { errorHandler } from '../errors/ErrorHandler';
import { logError } from '../services/logging.service';
import { default_citie_list, default_state_list } from '../utils/constent';








/**
 *  All models must be imported from this file or else they will not be registered with Sequelize
 */

export class Models {

    public sequelize: Sequelize;
    public static connection: Sequelize;
    constructor(config: any) {
        this.sequelize = new Sequelize(config);
        Models.connection = this.sequelize;
        this.checkAndCreateDatabase()
    }

    public async initModels() {
        console.log("done Database Model")
        this.sequelize.addModels(this.getModels());
        return await this.sequelize
            .sync
            (
                {
                    alter: true
                    // force: true
                }
            )
            .then(async (data: any) => {
                try {
                    const stateCount = await State.count();
                    if (stateCount == 0) {
                        await State.bulkCreate(default_state_list);
                    }
                    const cityCount = await City.count();
                    if (cityCount == 0) {
                        await City.bulkCreate(default_citie_list);
                    }
                } catch (error) {
                    logError(error)
                }

            }).catch((err: any) => {
                console.log(err)
                return
            });
    }
    private getModels() {
        const models: any[] = []
        // Function to recursively search for models in directories
        const searchModels = (directory: string) => {
            fs.readdirSync(directory).forEach((file: any) => {
                const fullPath = path.join(directory, file);
                if (fs.statSync(fullPath).isDirectory()) {
                    // If the item is a directory, recursively search for models
                    searchModels(fullPath);
                } else if (file.endsWith('model.js')) {
                    // If the file is a model, require it and add to the models array
                    const model = require(fullPath);
                    models.push(model.default);
                }
            });
        };

        // Start searching for models in the provided directory
        searchModels(__dirname);
        return models
    }
    async checkAndCreateDatabase() {
        let q;
        try {
            console.log("Database create function calleed ", process.env.DB_NAME)
            // Attempt to connect to the existing database
            q = await this.sequelize.query(
                `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
            );
            console.log({ q })
            console.log('Database already exists.');
        } catch (error: any) {
            console.log({ q })
            console.log("Dum Error ", error)
            // Other connection errors
            console.error('Error connecting to database:', error);
            throw error;
        }
    }

}



