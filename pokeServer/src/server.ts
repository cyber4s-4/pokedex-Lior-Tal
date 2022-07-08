import express from "express";
import { Request, Response } from "express";
import { json } from "body-parser";
import { PokeData } from "./pokeData";
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(json());
app.use(cors())

const filePath: string = path.join(__dirname, "../src/PokeData.json");
const readFileData: PokeData[] = JSON.parse(fs.readFileSync(filePath, "utf8"));

// Sending a GET Request to localhost:3000 will give the client PokeData json
app.get("/", (req: Request, res: Response) => {
    res.status(200).send(readFileData);
});


app.listen(3000);
