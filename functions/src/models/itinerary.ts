import { ObjectId } from "mongodb";

export interface Itinerary {
    destination: string;
    startDate?: string;
    endDate?: string;
    place?: Place[],
    _id?: ObjectId;
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
