import { PlaceDetails } from "../models/placeDetails";
import axios from "axios";

const key = "AIzaSyADw6kne2LUqaF8G-njq1U66rgpNkOgM7c";

export function getDetails(place_id: String): Promise<PlaceDetails> {
  return axios
    .get<PlaceDetails>(
      "https://maps.googleapis.com/maps/api/place/details/json",
      {
        params: { place_id, key },
      }
    )
    .then((response) => response.data);
}
