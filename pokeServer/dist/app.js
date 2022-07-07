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
    let pokemonUrlArray = [];
    const URL = `https://pokeapi.co/api/v2/pokemon?limit=${NUM_OF_POKEMONS}`;
    const response = await axios.get(URL)
        .then(function (result) {
        pokemonUrlArray = result.data.results;
    });
    // console.log(pokemonUrlArray);
    return pokemonUrlArray;
}
// Fetch from URL
async function fetchData(pokemon) {
    const URL = pokemon.url;
    let pokemonJson;
    await axios.get(URL)
        .then(function (result) {
        // console.log(result.data)
        pokemonJson = result.data;
        return pokemonJson;
    });
    return pokemonJson;
}
let pokemonJsonArray = [];
loadPokemonURLS().then(function (pokemonUrlArray) {
    // console.log(pokemonUrlArray[0].name);
    console.log(fetchData(pokemonUrlArray[0]));
});
// TODO: create json of pokemon json's
