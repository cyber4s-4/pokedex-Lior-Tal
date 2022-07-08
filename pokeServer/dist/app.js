"use strict";
/**
 * Script that fetches Pokemons from pokemon API
 * The data is then saved as JSON on the pokeServer database
 * Only wanted information is taken from API (interface customData)
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
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
// Fetch from URL the specific Pokemon data
async function fetchData(pokemon) {
    const URL = pokemon.url;
    let pokemonJson;
    const response = await axios.get(URL);
    let data = response.data;
    return data;
}
/**
 * Code runs and uses above functions, compiles only wanted
 * information to reduce loading time on actual app
 */
loadPokemonURLS().then(async function (pokemonUrlArray) {
    let pokemonJsonArray = [];
    // This code will run after 2 seconds, allowing all Pokemon data to be fetched
    setTimeout(() => {
        // Creating a json file for our server (contains all data)
        fs.writeFile('./src/PokeData.json', JSON.stringify(pokemonJsonArray), (err) => {
            if (err)
                throw err;
        });
    }, 2000);
    /**
     * Goes through every URL=> fetches data=> compiles only
     * wanted data (global app interface) => adds it to array
     */
    for (let pokemonUrl of pokemonUrlArray) {
        fetchData(pokemonUrl).then(pokemonData => {
            const customData = {
                name: pokemonData.name,
                img: pokemonData.sprites.other.dream_world.front_default,
                hp: pokemonData.stats[0].base_stat,
                exp: pokemonData.base_experience,
                height: pokemonData.height,
                weight: pokemonData.weight,
                types: pokemonData.types,
                abilities: pokemonData.abilities
            };
            pokemonJsonArray.push(customData);
        });
    }
});
