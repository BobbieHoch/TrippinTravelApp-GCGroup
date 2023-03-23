import express, {Request, Response} from "express";
import {getClient} from "../db";
import itineraryOps from "../models/itineraryOps";
import { ObjectId } from "mongodb";

export const itineraryOpsRoutes = express.Router(); 

itineraryOpsRoutes.get("/", async (req: Request, res: Response) => {
    const to = req.query.to as string;

    const 

}
)
// 