import * as functions from "firebase-functions";
import express, { Application } from "express";
import cors from "cors";
import { mapRoutes } from "./routes/mapRoutes";
import { itineraryRoutes } from "./routes/itineraryRoutes";

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use("/map", mapRoutes);
app.use("/itinerary", itineraryRoutes);

export const api = functions.https.onRequest(app);
