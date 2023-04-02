import axios from "axios";
import { NearbySearch } from "../models/nearbySearch";

const key = "AIzaSyADw6kne2LUqaF8G-njq1U66rgpNkOgM7c";

export function getNearbySearch(
  lat: Number,
  lng: Number,
  radius: Number,
  type: string
): Promise<NearbySearch> {
  const location = `${lat},${lng}`
  return axios
    .get<NearbySearch>(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
      { params: { location, radius, type, key } }
    )
    .then((response) => response.data);
}
