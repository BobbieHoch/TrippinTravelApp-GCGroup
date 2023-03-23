import {ObjectId} from "mongodb";


export default interface optionDetails {
  _id?: ObjectId;
  // Location
  lat: number;
  lng: number;
  // Result
  name: string;
  formatted_address: string;
  rating: number;
  types: string[];
    // CurrentOpeningHours
  weekday_text: string[];
  formatted_phone_number: string;
}


// export interface Photo {
//   height:number;
//   html_attributions: string[index 0];
//   width:number;
// }