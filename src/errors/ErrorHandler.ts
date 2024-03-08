import {RegistrationError} from "./RegistrationError";
import {AuthError} from "./AuthError";
import {DatabaseError} from "./DatabaseError";
import {NotFoundError} from "./NotFoundError";
import {DatabaseError as SequelizeError, ValidationError as SequelizeValidationError} from "sequelize";
import {InternalServerError} from "./InternalServerError";
import {ValidationError} from "./ValidationError";
import { NextFunction, Request, Response } from "express";


export function errorHandler(error:any, req:Request, res:Response, next:NextFunction) {

    if (error instanceof RegistrationError) {
        console.error(error);
        return res.status(400).json(error);
    }
    if (error instanceof AuthError) {
        console.error(error);
        return res.status(401).json(error);
    }
    if (error.name === 'AuthenticationError') {
        console.error(error.message);
        return res.status(403).json(error);
    }
    if (error instanceof DatabaseError) {
        console.error(error);
        return res.status(500).json(error);
    }
    if (error instanceof SequelizeError) {
        console.error(error.message);
        return res.status(500).json(new DatabaseError(error.message));
    }
    if (error instanceof NotFoundError) {
        console.error(error);
        return res.status(404).json(error);
    }
    if (error instanceof SequelizeValidationError) {
        console.error(error.message);
        return res.status(400).json(new ValidationError(error.message));
    }
    console.error(error.message);
    return res.status(500).json(new InternalServerError(error.message));

}
