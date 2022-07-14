import { PokeData } from "./pokeData";
import * as fs from 'fs';
import { MongoClient } from 'mongodb'
import { uri } from './key'

const client = new MongoClient(uri)

async function main() {
    try {
        
        await client.connect()

        const pokeDB = client.db("pokeDataBase")
        
        const pokeData_collection = pokeDB.collection<PokeData>("pokeData")

        const pokeJson = readJSON();

        await pokeData_collection.insertMany(pokeJson);
        
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
}

function readJSON() {
    let rawData = fs.readFileSync('./PokeData.json', 'utf-8')
    let pokeDataArray: PokeData[] = JSON.parse(rawData);
    return pokeDataArray;
}

main()