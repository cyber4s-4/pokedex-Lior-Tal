import express from "express";
import { Request, Response } from "express";
import { json } from "body-parser";
import { customData } from "../client/Typescript/pokeData";
import { MongoClient } from 'mongodb';
import { main, searchAll, allFav, updateFavorite, updateFavoriteFalse } from './queries';

const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
export const uri = 'mongodb+srv://cyber4s:pokemondata@cluster0.dw27scw.mongodb.net/?retryWrites=true&w=majority';
const MAX_PAGE_NUM = 5000;

app.use(json());
app.use(cors())


// ! DEPRECATED
const filePath: string = path.join(__dirname, "../PokeData.json");
const readFileData: customData[] = JSON.parse(fs.readFileSync(filePath, "utf8"));

// Data request endpoint for pagination on client side
app.get("/data", async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string);

    if (page > 0 && page < MAX_PAGE_NUM) {
        await main(page).then((pokeDataArray) => {
            res.status(200).send(pokeDataArray);
        })
    }

    else if (page < 1 || page > MAX_PAGE_NUM) {
        res.status(404).send('Not found');
    }
});

// Search endpoint for finding pokemon by name
app.get("/search", async (req: Request, res: Response) => {
    const searchQuery = req.query.name as string;

    await searchAll(searchQuery).then((pokeDataArray)=>{
        if (pokeDataArray.length===0) {
            res.status(200).send('Not found')
        } else if (pokeDataArray.length>0) {
            res.status(200).send(pokeDataArray[0]);
        }
    })
})

app.get("/allFav", async (req: Request, res: Response) => {
    await allFav().then((pokeDataArray)=>{
        if (pokeDataArray.length===0) {
            res.status(200).send('Not found')
        } else if (pokeDataArray.length>0) {
            res.status(200).send(pokeDataArray);
        }
    })
})

// Search endpoint for finding pokemon by name
app.get("/favorite", async (req: Request, res: Response) => {
    const updateQuery = req.query.name as string;

    // TODO: Implement
    // await updateFavorite(updateQuery).then(()=>{
    //     if (pokeDataArray.length===0) {
    //         res.status(200).send('Not found')
    //     } else if (pokeDataArray.length>0) {
    //         res.status(200).send(pokeDataArray[0]);
    //     }
    // })
})

app.get("/unfavorite", async (req: Request, res: Response) => {
    const updateQuery = req.query.name as string;

    // TODO: Implement
    // await updateFavoriteFalse(updateQuery).then(()=>{
    //     if (pokeDataArray.length===0) {
    //         res.status(200).send('Not found')
    //     } else if (pokeDataArray.length>0) {
    //         res.status(200).send(pokeDataArray[0]);
    //     }
    // })
})


app.listen(3000);
