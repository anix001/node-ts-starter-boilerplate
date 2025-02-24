import {Request, Response} from "express";
import { HttpError } from "../interface";
import { Logger } from "../utils";

export const errorHandler = (err:HttpError, req:Request, res:Response):void=>{
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    //Log the error
    Logger.error(`${status} - ${message}`);
    console.error(`Error: ${status} - ${message}`);

    //Send error response
    res.status(status).json({
        success: false,
        status,
        message
    });
};