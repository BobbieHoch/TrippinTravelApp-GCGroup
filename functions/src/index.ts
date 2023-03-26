import * as functions from "firebase-functions";
import express, {Application} from "express";
import cors from "cors";
import { apiRoutes } from "./routes/apiRoutes"


const app:Application = express();
app.use(cors());
app.use(express.json());

app.use("/", apiRoutes);



export const api = functions.https.onRequest(app);
