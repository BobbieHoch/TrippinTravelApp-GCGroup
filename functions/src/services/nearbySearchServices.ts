import axios from "axios";
import router from "express";
import googconfig from "../config/config";
import { NearbySearch } from "../models/nearbySearch";

const key = googconfig;
let radius = 5000;

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