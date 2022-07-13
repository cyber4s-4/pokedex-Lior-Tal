import { PokeData } from "./pokeData";
import * as fs from 'fs';
import {NUM_OF_POKEMONS} from './index';

fs.readFile('./PokeData.json','utf-8',(err, data)=>{
    if (err) throw err;
    let pokeDataArray: PokeData[] = JSON.parse(data)

    console.log(pokeDataArray.length);

    if(pokeDataArray.length === NUM_OF_POKEMONS) {
        console.log("JSON file created successfully");
    } else {
        throw new Error("JSON file damaged")
    }

})