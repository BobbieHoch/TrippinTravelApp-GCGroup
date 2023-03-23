import { Router, Request, Response } from "express";
import { Photo } from "../models/placePhotos";
import googconfig from "../config/config";
import axios from "axios";

const key = googconfig;

export function getPlacePhotos(photo_reference: string): Promise<Photo> {
  return axios
    .get<Photo>("https://maps.googleapis.com/maps/api/place/photo/json", {
      params: { photo_reference, key },
    })
    .then((response) => response.data);
}
