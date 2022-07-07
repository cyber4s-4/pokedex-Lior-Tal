"use strict";
/**
 * Script that fetches Pokemons from pokemon API
 * The data is then save as JSON on the pokeServer database
 */
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require('axios');
// Can be changed for array size config
const NUM_OF_POKEMONS = 151;
/*
Initial pokemon data fetch (GET) => Gets json with
'pokemon-name': 'URL' for each pokemon
*/
async function loadPokemonURLS() {
    const URL = `https://pokeapi.co/api/v2/pokemon?limit=${NUM_OF_POKEMONS}`;
    const response = await axios.get(URL)
        .then(function (result) {
        console.log(result);
    });
    // const pokemons = await response.json();
    // console.log(response);
    // return pokemons;
}
loadPokemonURLS();
// Fetch from URL
async function fetchRawData(pokemon) {
    return await fetch(pokemon.url)
        .then(response => response.json());
}
//# sourceMappingURL=app.js.map