/**
 * Script that fetches Pokemons from pokemon API 
 * The data is then save as JSON on the pokeServer database
 */

import { PokeData } from "./pokeData"

const axios = require('axios');


// Can be changed for array size config
const NUM_OF_POKEMONS = 151;

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

// Fetch from URL
async function fetchData(pokemon: pokemonUrlJson): Promise<PokeData> {
    const URL = pokemon.url;
    let pokemonJson: PokeData;
    const response = await axios.get(URL)
    let data: PokeData = response.data;
    return data;
    
}


loadPokemonURLS().then(function (pokemonUrlArray) {
    let pokemonJsonArray: PokeData[] = [];

    for (let pokemonUrl of pokemonUrlArray) {
        fetchData(pokemonUrl).then(function (result) {
            console.log(typeof result);            
            pokemonJsonArray.push(result)
        })
    }
    console.log(pokemonJsonArray);
    
})
// TODO: create json of pokemon json's


