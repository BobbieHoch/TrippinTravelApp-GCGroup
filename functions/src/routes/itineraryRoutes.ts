import express, { Request, Response } from "express";
import { getClient } from "../db";
import { Itinerary } from "../models/itinerary";
import { ObjectId, RemoveUserOptions } from "mongodb";
import { Place } from "../models/itinerary";

export const itineraryRoutes = express.Router();

//get options from api based on location all details
itineraryRoutes.get(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const client = await getClient();

      const result = client
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
  "/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const itineraryId = req.params.id;
    const updatedItinerary = req.body as Itinerary;
    try {
      const client = await getClient();
      const results = await client
        .db("final")
        .collection("itineraries")
        .replaceOne({ _id: new ObjectId(itineraryId) }, updatedItinerary);
      if (!results) {
        return res.status(404).json({ message: "Itinerary not found" });
      }

      return res.json(results);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

//delete 1 option from trip
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

      return res.json({ message: "Itinerary option deleted successfully" });
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

itineraryRoutes.delete("/:id/:name", async (req: Request, res: Response) => {
  // Extract the ID parameter from the request
  const id = req.params.id;
  const name = req.params.name;

  try {
    // Connect to the MongoDB database
    const client = await getClient();

    // Get a reference to the trips collection
    const result = await client
      .db("final")
      .collection<Itinerary>("itineraries")
      .updateOne(
        { _id: new ObjectId(id) },
        { $pull: { place: { name: name } } }
      );

    // Check if the object was deleted successfully
    if (result.modifiedCount === 1) {
      res.status(200).send(`From ID ${id}, ${name} was deleted.`);
    } else {
      res.status(404).send(`Object with ID ${id} not found`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// itineraryRoutes.delete("/:id", async (res: Response, req: Request) => {
//   const id = req.params.id;
//   try {
//     const client = await getClient();
//     const placeIdToDelete = new ObjectId(id); // replace with actual ObjectId of the document you want to delete

//     // assuming you have a MongoClient instance set up and connected to your MongoDB database
//     const result = await client
//       .db("final")
//       .collection<Place>("itineraries")
//       .deleteOne({ _id: placeIdToDelete });

//     if (result.deletedCount === 1) {
//       console.log(`Successfully deleted place with id ${placeIdToDelete}`);
//     } else {
//       console.log(`Could not delete place with id ${placeIdToDelete}`);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal server error");
//   }
// });
