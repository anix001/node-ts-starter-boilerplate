import express, {Express, Request, Response} from "express";
import cors from "cors";

import { config } from "./utils";
import { corsOptions, errorHandler } from "./middleware";
import appRoutes from "./routes"


const app:Express = express();
const port = config.port;

//[for json parse]
app.use(express.json());
//[for cors]
app.use(cors(corsOptions));


//routes
app.use("/api", appRoutes);

app.get('/', (req:Request, res:Response)=>{
    res.send("Express + Typescript Boilerplate");
});

//[error middleware]
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`[server]: Server is running on port ${port}!!`);
});

