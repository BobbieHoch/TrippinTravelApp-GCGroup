import { ObjectId } from "mongodb";

export interface Itinerary {
  tripName: string;
  name: string;
  place_id: string;
  photo_reference: string;
  startDate: string;
  endDate: string;
  place: Place[];
  _id?: ObjectId;
  lat: number;
  lng: number;
}

export interface Place {
  name: string;
  id: string;
  photo_reference: string;
  formatted_address: string;
  rating: number;
  types: string[];
  _id?: ObjectId;
  lat: number;
  lng: number;
}
