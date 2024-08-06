import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";

//[Configure Dotenv]
dotenv.config();


const app:Express = express();
const port = process.env.PORT || 8000;

//[for json parse]
app.use(express.json());

app.get('/', (req:Request, res:Response)=>{
    res.send("Express + Typescript Boilerplate");
});

app.listen(port, ()=>{
    console.log(`[server]: Server is running on port ${port}!!`);
});

