import express, { Request, Response } from "express";
import { getClient } from "../db";
import { Itinerary } from "../models/itinerary";
import { ObjectId } from "mongodb";

export const itineraryRoutes = express.Router();

//get options from api based on location all details
itineraryRoutes.get(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const client = await getClient();

      const result = client
        .db("final")
        .collection<Itinerary>("Itineraries")
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
  "/:name",
  async (req: Request, res: Response): Promise<Response> => {
    const nameTrip = req.params.name as string;
    try {
      const client = await getClient();
      const result = await client
        .db("final")
        .collection<Itinerary>("itineraries")
        .findOne({ name: nameTrip });

      if (!result) {
        return res.status(404).send("Trip not found");
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
        .db("finals")
        .collection<Itinerary>("itineraries")
        .insertOne(newTrip);

      return res.status(201).json();
    } catch (error) {
      return res.status(500).send(error);
    }
  }
);

//Edit a trip, Name, date, option  (named and date place is saved)
itineraryRoutes.put("/itinerary/:id", async (req: Request, res: Response) => {
  const itineraryId = req.params.id;
  const updatedItinerary: Itinerary = req.body;
  try {
    const client = await getClient();
    const results = await client
      .db("final")
      .collection("itineraries")
      .findOneAndUpdate({ _id: new ObjectId(itineraryId) }, updatedItinerary);
    if (!results) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    return res.json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});
//delete option from trip

//delete entire trip
itineraryRoutes.delete("/:id", async (req: Request, res: Response) => {
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
});
