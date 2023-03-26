
import axios from "axios";
import { Photo } from "../models/placePhotos";

const key = "AIzaSyADw6kne2LUqaF8G-njq1U66rgpNkOgM7c";
const maxwidth = 1000

export function getPlacePhotos(photo_reference: string): Promise<Photo> {
  return axios
    .get<Photo>("https://maps.googleapis.com/maps/api/place/photo", {
      params: {maxwidth, photo_reference, key },
    })
    .then((response) => response.request.res.responseUrl);
  }