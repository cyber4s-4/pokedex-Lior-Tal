import express from "express";
import { Request, Response } from "express";
import { json } from "body-parser";
import { customData } from "./pokeData";

const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../client")))

const filePath: string = path.join(__dirname, "./PokeData.json");
const readFileData: customData[] = JSON.parse(fs.readFileSync(filePath, "utf8"));

// Sending a GET Request to localhost:3000 will give the client PokeData json
app.get("/data", (req: Request, res: Response) => {
    res.status(200).send(readFileData);
});

app.get("/", (req: Request, res: Response) => {
    res.status(200).sendFile(path.join(__dirname, "../client/HTML/index.html"));
});

app.listen(process.env.PORT || 3000);
