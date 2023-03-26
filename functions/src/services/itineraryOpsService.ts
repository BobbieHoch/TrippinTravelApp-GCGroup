// import {Location, Result}  from "../../../../FinalProjectFrontend/myapp/src/models/nearbySearch";
// import { OpeningHours } from "../../../../FinalProjectFrontend/myapp/src/models/placeDetails";
// import { Photo } from "../../../../FinalProjectFrontend/myapp/src/models/placePhotos";
// import { Type } from "../../../../FinalProjectFrontend/myapp/src/models/textSearch";
// import axios from "axios";

// const baseUrl = "https://us-central1-trippin-dc0bc.cloudfunctions.net/api";
// //Unclear where to drop the apikey to test.

// //search for options by location based on user input
// export function fetchItineraryOptions( city: string, stateCode: string) {
//   return (
//     axios.get<Result>(`{baseUrl}+"AIzaSyCtZRcyHTGawuW5LPfPKt1TExEfgtPGG5"`, {
//       params: {
//         City: city || "",
//         stateCode: stateCode || "",
//       },
//     })
//       .then((response) => response.data)

//       .catch((error) => {
//         alert("Invalid search term, please try again");
//         console.log(error);
//       })
//   );

// }

// //get location details to save and display as part of trip
// export function fetchOptionSpecs():Promise<Result[]> {
//   return axios.get<Result[]>("https://us-central1-trippin-dc0bc.cloudfunctions.net/api=AIzaSyCtZRcyHTGawuW5LPfPKt1TExEfgtPGG50")
//   .then((res: { data: any; }) => res.data)
// }

// //Get specific location?? were going to use for 25 mile radius search for vacation options
// export function fetchlocation(location:Location):Promise<Location> {
//   return axios.post<Location>("https://us-central1-trippin-dc0bc.cloudfunctions.net/api=AIzaSyCtZRcyHTGawuW5LPfPKt1TExEfgtPGG50").then(res => res.data);
// }


// //Part of activity specifics included open hours
// export function fetchOpenHours(weekday_text: string): Promise<OpeningHours[]> {
//     return axios.get<OpeningHours[]>("https://us-central1-trippin-dc0bc.cloudfunctions.net/api=AIzaSyCtZRcyHTGawuW5LPfPKt1TExEfgtPGG50", {
//         params: {weekday_text}
//     })
//         .then(res => res.data)
// }

// //Element of activity specifics include an image- need to get photo_reference 
// export function fetchimage(photo_reference:string): Promise<Photo> {
//   return axios.get <photo_reference:string> ("https://us-central1-trippin-dc0bc.cloudfunctions.net/api=AIzaSyCtZRcyHTGawuW5LPfPKt1TExEfgtPGG50", {
//     params: {photo_reference}
//     .then(res => res.data);
//   })
//   // ? maxwidth = 1336 & photo_reference={
//   //   photo_reference: string
//   // }&key=AIzaSyCtZRcyHTGawuW5LPfPKt1TExEfgtPGG50
// }