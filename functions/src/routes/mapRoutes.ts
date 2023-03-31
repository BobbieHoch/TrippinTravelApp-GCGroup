import express, { Request, Response } from "express";
import { getNearbySearch } from "../services/nearbySearchServices";
import { getDetails } from "../services/placeDetailsService";
import { getPlacePhotos } from "../services/placePhotosService";
import { getTextSearch } from "../services/textSearchService";

export const mapRoutes = express.Router();

mapRoutes.get("/", async (req: Request, res: Response) => {
  const query = req.query.query as string;
  const lat = Number(req.query.lat);
  const lng = Number(req.query.lng);
  const photoReference = req.query.photo_reference as string;
  const placeId = req.query.place_id as string;
  const radius = Number(req.query.radius);
  try {
    let result;
    if (query) {
      result = await getTextSearch(query, radius);
    } else if (lat && lng) {
      result = await getNearbySearch(lat, lng, radius);
    } else if (photoReference) {
      result = await getPlacePhotos(photoReference);
    } else if (placeId) {
      result = await getDetails(placeId);
    } else {
      return res.status(400).send("Invalid request");
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).send(error);
  }
});
