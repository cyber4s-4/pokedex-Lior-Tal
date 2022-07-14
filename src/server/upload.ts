import { PokeData } from "./pokeData";
import * as fs from 'fs';
import { MongoClient } from 'mongodb'
import { uri } from './key'

const client = new MongoClient(uri)

async function main() {
    try {
        
        await client.connect()

        const pokeDataCollection = client.db("pokeDataBase").collection("pokeData")

        const pokeData = uploadData()

        console.log(pokeData);
        
        
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
}

async function uploadData() {
    fs.readFile('./PokeData.json', 'utf-8', (err, data) => {
        if (err)
            throw err;
        let pokeDataArray: PokeData[] = JSON.parse(data);
        return pokeDataArray;
    })
}

main()