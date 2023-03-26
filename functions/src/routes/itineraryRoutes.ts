import {Router, Request, Response} from "express";
import {getClient} from "../db";
import {Place, Itinerary} from "../models/itinerary"
import { ObjectId } from "mongodb";

export const itineraryRoutes = Router();


//get options from api based on location all details
itineraryRoutes.get("/", async (req:Request, res:Response): Promise<Response>  => {
    try {
        const client = await getClient();
        
        const result = client
            .db("final")
            .collection<Place>("users")
            .find({})
            .toArray();
            return res.status(200).json(result);
        } catch (error) {
          return res.status(500).send(error);
        }
      });
  
  
  

 

//get options trip name and its details
itineraryRoutes.get("/", async (req:Request, res:Response) => {
    const nameTrip = req.params.name as string;
  try {
    const client = await getClient();
    const result = await client.db().collection<Itinerary>("itinerary").findOne({name: new ObjectId(nameTrip)});

    if (!result) {
      return res.status(404).send("Trip not found");
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).send(error);
  }
});


//Save trip name and it selected placeDetails
itineraryRoutes.post("/", async (req:Request, res:Response) => {
  const newTrip = req.body as Itinerary;

  try {
    const client = await getClient();

    await client.db().collection<Itinerary>("itinerary").insertOne(newTrip);

    return res.status(201).json();
  } catch (error) {
    return res.status(500).send(error);
  }
});


//Edit a trip, Name, date, option  (named and date place is saved)
itineraryRoutes.put("/itinerary/:id", async (req:Request, res:Response) => {
  const itineraryId = req.params.id;
    const updatedItinerary: Itinerary = req.body;

    const itinerary = await Itinerary.findOneAndUpdate(
        { _id: itineraryId }, updatedItinerary, { new: true }
    );
    if (!itinerary) {
        return res.status(404).json({ message: 'Itinerary not found' });
      }
  
      res.json(itinerary);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});
//delete option from trip 


//delete entire trip 
itineraryRoutes.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const client = await getClient();
      const result = await client.db().collection<Itinerary>("name").deleteOne({_id: new ObjectId(id)});
      if (!name) {
        return res.status(404).json({ message: 'Itinerary not found' });
      }
  
      res.json({ message: 'Itinerary deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });