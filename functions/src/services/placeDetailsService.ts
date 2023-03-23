import { Router, Request, Response } from "express";
import { PlaceDetails } from "../models/placeDetails";
import googconfig from "../config/config";
import axios from "axios";

const key = googconfig;
let radius = 5000;

export function getTextSearch(place_id: Number): Promise<PlaceDetails> {
  return axios
    .get<PlaceDetails>(
      "https://maps.googleapis.commaps/api/place/details/json",
      {
        params: { place_id, key },
      }
    )
    .then((response) => response.data);
}
