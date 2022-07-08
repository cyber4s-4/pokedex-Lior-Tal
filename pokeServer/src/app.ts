/**
 * Script that fetches Pokemons from pokemon API 
 * The data is then saved as JSON on the pokeServer database
 * Only wanted information is taken from API (interface customData)
 */

import { PokeData, Ability, Type, customData } from "./pokeData";
import * as fs from 'fs';

const axios = require('axios');

// ! Change this variable if you've come here from troubleshooting 
const LOADING_TIME = 11000; // 2000ms = 2 seconds

// Can be changed for array size config
export const NUM_OF_POKEMONS = 151;

// URL json for fetch
interface pokemonUrlJson {
    name: string
    url: string
}

/* 
Initial pokemon data fetch (GET) => Gets json with 
'pokemon-name': 'URL' for each pokemon
*/
async function loadPokemonURLS(): Promise<pokemonUrlJson[]> {
    let pokemonUrlArray: pokemonUrlJson[] = [];
    const URL = `https://pokeapi.co/api/v2/pokemon?limit=${NUM_OF_POKEMONS}`
    const response = await axios.get(URL)
        .then(function (result: any) {
            pokemonUrlArray = result.data.results;
        })

    return pokemonUrlArray;
}

// Fetch from URL the specific Pokemon data
async function fetchData(pokemon: pokemonUrlJson): Promise<PokeData> {
    const URL = pokemon.url;
    let pokemonJson: PokeData;
    const response = await axios.get(URL)
    let data: PokeData = response.data;
    return data;

}

/**
 * Code runs and uses above functions, compiles only wanted 
 * information to reduce loading time on actual app
 */
loadPokemonURLS().then(async function (pokemonUrlArray) {
    let pokemonJsonArray: customData[] = [];

    // // This code will run after 2 seconds, allowing all Pokemon data to be fetched
    // setTimeout(()=>{

        
    // //
    // }, LOADING_TIME)

    /**
     * Goes through every URL=> fetches data=> compiles only 
     * wanted data (global app interface) => adds it to array
     */
    for (let pokemonUrl of pokemonUrlArray) {
        await fetchData(pokemonUrl).then(pokemonData=> {
            
            const customData: customData = {
                name: pokemonData.name,
                img: pokemonData.sprites.other!.dream_world.front_default,
                hp: pokemonData.stats[0].base_stat,
                exp: pokemonData.base_experience,
                height: pokemonData.height,
                weight: pokemonData.weight,
                types: pokemonData.types,
                abilities: pokemonData.abilities
            }

            pokemonJsonArray.push(customData);
        })
    }

    return pokemonJsonArray;

}).then(pokemonJsonArray=> {
    console.log(pokemonJsonArray);
    // Creating a json file for our server (contains all data)
    fs.writeFile('./src/PokeData.json', JSON.stringify(pokemonJsonArray), (err)=>{
        if(err) throw err;
    });
})

