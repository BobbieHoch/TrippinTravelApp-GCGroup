import express, {Request, Response} from "express";
import { getTextSearch } from "../services/textSearchService";

export const apiRoutes = express.Router();

apiRoutes.get("/", async (req:Request, res:Response) => {
    const query = req.query.query as string
    const radius = Number(req.query.radius)

    try{
        const result = await getTextSearch(query,radius)
        return res.status(200).json(result)
    }
    catch (error) {
        return res.status(500).send(error)
    }
    
})

