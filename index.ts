import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import apiRouter from "./src/router";
import * as mongoose from "mongoose";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const database_uri = process.env.DATABASE_URI;

if(!database_uri) {
    throw new Error("Database uri is not provided");
}

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Diana');
});

app.use("/api", apiRouter);

app.listen(port, async () => {
    await mongoose.connect(database_uri, {dbName: "HappyFarm"});
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
