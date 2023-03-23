import { Router, Request, Response } from "express";
import { TextSearch } from "../models/textSearch";
import googconfig from "../config/gconfig";
import axios from "axios";

const key = "AIzaSyADw6kne2LUqaF8G-njq1U66rgpNkOgM7c";

export function getTextSearch(
  query: String,
  radius: Number
): Promise<TextSearch> {
  return axios
    .get<TextSearch>(
      "https://maps.googleapis.com/maps/api/place/textsearch/json",
      {
        params: { query, radius, key },
      }
    )
    .then((response) => response.data);
}
