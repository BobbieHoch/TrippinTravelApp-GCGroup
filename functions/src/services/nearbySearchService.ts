import axios from "axios";
import { NearbySearch } from "../models/nearbySearch";

const key = "AIzaSyADw6kne2LUqaF8G-njq1U66rgpNkOgM7c";


export function getNearbySearch(
  lat: Number,
  lng: Number,
  radius: Number
): Promise<NearbySearch> {
  return axios
    .get<NearbySearch>(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
      { params: { lat, lng, radius, key } }
    )
    .then((response) => response.data);
}
