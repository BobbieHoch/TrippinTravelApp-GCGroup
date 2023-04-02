import express, { Request, Response } from "express";
import { getClient } from "../db";
import { Itinerary, Place } from "../models/itinerary";
import { ObjectId } from "mongodb";


export const itineraryRoutes = express.Router();

//get options from api based on location all details
itineraryRoutes.get(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const client = await getClient();

      const result = await client
        .db("final")
        .collection<Itinerary>("itineraries")
        .find({})
        .toArray();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
);

//get options trip name and its details
itineraryRoutes.get(
  "/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const id = new ObjectId(req.params.id);
    try {
      const client = await getClient();
      const result = await client
        .db("final")
        .collection<Itinerary>("itineraries")
        .findOne({ _id: id });

      if (!result) {
        return res.status(404).send("Itinerary not found");
      }

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
);

//Save trip name and it selected placeDetails
itineraryRoutes.post(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    const newTrip = req.body as Itinerary;

    try {
      const client = await getClient();

      await client
        .db("final")
        .collection<Itinerary>("itineraries")
        .insertOne(newTrip);

      return res.status(201).json();
    } catch (error) {
      return res.status(500).send(error);
    }
  }
);

//Edit a trip, Name, date, option  (named and date place is saved)
itineraryRoutes.put(
  "/:id/:tripName",
  async (req: Request, res: Response): Promise<Response> => {
    const place = req.body as Place;
    const itineraryId = req.params.id;
    const tripName = req.params.tripName

    try {
      const client = await getClient();
      const result = await client
        .db("final")
        .collection("itineraries")
        .updateOne(
          { place_id: itineraryId,tripName: tripName },
          { $push: { place: place } }
        );

      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: "Itinerary not found" });
      }

      return res.json({ message: "Place added to itinerary" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

//delete 1 option from trip
itineraryRoutes.delete(
  "/:id/:placeId",
  async (req: Request, res: Response): Promise<Response> => {
    const itineraryId = req.params.id;
    const placeId = req.params.placeId;
    try {
      const client = await getClient();
      const result = await client
        .db("final")
        .collection("itineraries")
        .updateOne(
          { _id: new ObjectId(itineraryId) },
          { $pull: { place: { id: placeId } } }
        );
      if (!result.modifiedCount) {
        return res.status(404).json({ message: "Place not found in itinerary" });
      }
      return res.json({ message: `From ID ${itineraryId}, ${placeId} was deleted` });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

//delete entire trip
itineraryRoutes.delete(
  "/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    try {
      const client = await getClient();
      const result = await client
        .db("final")
        .collection<Itinerary>("itineraries")
        .deleteOne({ _id: new ObjectId(id) });
      if (!result) {
        return res.status(404).json({ message: "Itinerary not found" });
      }

      return res.json({ message: "Itinerary deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }
);