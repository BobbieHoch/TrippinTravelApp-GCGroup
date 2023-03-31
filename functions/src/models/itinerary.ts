import { ObjectId } from "mongodb";

export interface Itinerary {
  tripName: string;
  name: string;
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
  formatted_address: string;
  rating: number;
  types: string[];
  weekday_text: string[];
  _id?: ObjectId;
  lat: number;
  lng: number;
}
