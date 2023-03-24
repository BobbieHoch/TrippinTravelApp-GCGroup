import * as functions from "firebase-functions";
import express, {Application} from "express";
import cors from "cors";
import { apiRoutes } from "./routes/apiRoutes"


const app:Application = express();
app.use(cors());
app.use(express.json());

app.use("/textSearch", apiRoutes);


// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const api = functions.https.onRequest(app);