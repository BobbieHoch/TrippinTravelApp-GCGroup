import { ObjectId } from "mongodb";

export interface Itinerary {
    name: string;
    startDate: string;
    endDate: string;
    Place: Place[];
    _id: ObjectId;
    lat: number;
    lng: number;
}

export interface Place {
    name: string;
    formatted_address: string;
    rating: number;
    types: string[];
    formatted_phone_number: string;
    weekday_text: string[];
    _id?: ObjectId;
    lat: number;
    lng: number;
}
