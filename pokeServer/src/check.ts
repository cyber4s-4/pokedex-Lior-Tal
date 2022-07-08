import { PokeData } from "./pokeData";
import * as fs from 'fs';

fs.readFile('./src/PokeData.json','utf-8',(err, data)=>{
    if (err) throw err;
    let pokeDataArray: PokeData[] = JSON.parse(data)
    // console.log(pokeDataArray[77].abilities);

    pokeDataArray.forEach(element => {
        console.log(element.name);
    });

    console.log(pokeDataArray.length);

})