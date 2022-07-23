import express from "express";
import { Request, Response } from "express";
import { json } from "body-parser";
import { customData } from "../client/Typescript/pokeData";
import { MongoClient } from 'mongodb';
import { main, searchAll, allFav, updateFavorite, updateFavoriteFalse } from './queries';
import { getPage, getPokemonByName } from "./queries";
import { Client, Pool } from "pg"

const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
export const uri = 'mongodb+srv://cyber4s:pokemondata@cluster0.dw27scw.mongodb.net/?retryWrites=true&w=majority';
const MAX_PAGE_NUM = 500;
const DATABASE_URL = `postgres://sugivyejdjefcn:12ae2f93e7ac3f60b980821d5e04da5d61d9cc4fc463071f19b21f18945ed1cd@ec2-3-223-169-166.compute-1.amazonaws.com:5432/d4e5r4bgdqcmdo`;

app.use(json());
app.use(cors())

/**
 * 'heroku-server.ts' is a modified version of 'server.ts'
 * compatible for heroku with specific config instead of local browserSync/gulp
 */

const pgClient = new Pool({
    connectionString: DATABASE_URL
    ,
    ssl: {
        rejectUnauthorized: false
    }
});

// Gets 20 pokemons in specific page (Postgres)
app.get("/data-pg", async (req: Request, res: Response) => {
    const pageNumber = parseInt(req.query.page as string);

    if (pageNumber > 0 && pageNumber < MAX_PAGE_NUM) {
        console.log("Started query, page number:" + pageNumber);
        await getPage(pgClient, pageNumber).then((pokeDataArray) => {
            res.status(200).send(pokeDataArray);
        })
    }

    else if (pageNumber < 1 || pageNumber > MAX_PAGE_NUM) {
        res.status(404).send('Not found');
    }
});

// Gets pokemon by name (Postgres)
app.get("/search-pg", async (req: Request, res: Response) => {
    const searchQuery = req.query.name as string;

    await getPokemonByName(pgClient, searchQuery).then((pokeDataArray) => {
        console.log(pokeDataArray);
        if (pokeDataArray.length === 0) {
            res.status(200).send('Not found');
        } else if (pokeDataArray.length > 0) {
            res.status(200).send(pokeDataArray[0]);
        }
    })
});

// TODO: Implement
app.get("/allFav", async (req: Request, res: Response) => {
    await allFav().then((pokeDataArray) => {
        if (pokeDataArray.length === 0) {
            res.status(200).send('Not found')
        } else if (pokeDataArray.length > 0) {
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
