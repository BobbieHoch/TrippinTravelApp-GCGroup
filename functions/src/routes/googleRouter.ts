import express from "express";
import { getClient } from "../db";
import { ObjectId } from "mongodb";
import { NearbySearch, Result } from "../models/nearbySearch";
import axios from "axios";
import * as functions from "firebase-functions";

const googleRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};
googleRouter.get("/nearby", async (req, res) => {
  try {
    const lat = req.query.lat as string;
    const lng = req.query.lng as string;
    const radius = req.query.radius as string;
    const key = functions.config().google.key;
    const location = `${lat},${lng}`;
    const places = (await axios
      .get<NearbySearch>(
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
        { params: { location, radius, key } }
      )).data
      res.status(200).json(places);
  } catch (err) {
    errorResponse(err, res);
  }
});

googleRouter.get("/nearby/:id", async (req, res) => {
  try {
    let id: string = req.params.id as string;
    const client = await getClient();
    const results = client
      .db()
      .collection<Result>("itinerarys")
      .find({ _id: new ObjectId(id) });
    if (results) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: "ID not Found" });
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

googleRouter.post("/nearby", async (req, res) => {
  try {
    const client = await getClient();
    const newItem = req.body;
     client
      .db()
      .collection<Result>("itinerarys")
      .insertOne(newItem);
    res.status(200);
    res.json(newItem);
  } catch (error) {
    errorResponse(error, res);
  }
});

googleRouter.put("/nearby/:id", async (req, res) => {
  try {
    let id: string = req.params.id as string;
    const replacement = req.body;
    replacement._id = new ObjectId(id);
    const client = await getClient();
    const result = await client
      .db()
      .collection<Result>("itinerarys")
      .replaceOne({ _id: new ObjectId(id) }, replacement);
    if (result.modifiedCount) {
      res.status(200);
      res.json(replacement);
    } else {
      res.status(404);
      res.send("ID not found");
    }
  } catch (error) {
    errorResponse(error, res);
  }
});

googleRouter.patch("/nearby/:id", async (req, res) => {
  try {
    let id: string = req.params.id as string;
    const update = req.body;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Result>("itinerarys")
      .updateOne({ _id: new ObjectId(id) }, { $set: update });
    if (result.modifiedCount) {
      res.status(200);
      res.json(update);
    } else {
      res.status(404);
      res.send("ID not found");
    }
  } catch (error) {
    errorResponse(error, res);
  }
});

googleRouter.delete("/nearby/:id", async (req, res) => {
  try {
    let id: string = req.params.id as string;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Result>("itinerarys")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount) {
      res.sendStatus(204);
    } else {
      res.status(404);
      res.send("No ID found");
    }
  } catch (error) {
    errorResponse(error, res);
  }
});

export default googleRouter;