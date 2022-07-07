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
    return pokemonUrlArray;
}
// Fetch from URL
async function fetchData(pokemon) {
    const URL = pokemon.url;
    let pokemonJson;
    const response = await axios.get(URL);
    let data = response.data;
    return data;
}
loadPokemonURLS().then(function (pokemonUrlArray) {
    let pokemonJsonArray = [];
    for (let pokemonUrl of pokemonUrlArray) {
        fetchData(pokemonUrl).then(function (result) {
            console.log(typeof result);
            pokemonJsonArray.push(result);
        });
    }
    console.log(pokemonJsonArray);
});
// TODO: create json of pokemon json's
