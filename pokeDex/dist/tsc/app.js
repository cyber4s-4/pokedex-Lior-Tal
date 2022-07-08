"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pokemon_1 = require("./pokemon");
const axios_1 = require("axios");
/**
 * app.ts is used by index.html ("Landing page")
 * app.ts is in charge of API data fetching, renders "Featured Pokemon" segment
 * and "Discover" button
 *  */
// Can be changed for array size config
const NUM_OF_POKEMONS = 151;
/*
Initial pokemon data fetch (GET) => Gets json with
'pokemon-name': 'URL' for each pokemon
*/
async function loadPokemonURLS() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${NUM_OF_POKEMONS}`);
    const pokemons = await response.json();
    // console.log(response);
    return pokemons;
}
// Fetch from URL
async function fetchRawData(pokemon) {
    return await fetch(pokemon.url)
        .then(response => response.json());
}
/**
 * Initiates the landing page UI on "load" (after HTML is loaded)
 */
function initUI(pokemonArray) {
    const featuredPokemons = (0, pokemon_1.surpriseMe)(pokemonArray);
    let count = 1;
    let locations = ['', 'left', 'center', 'right'];
    for (let featuredPokemon of featuredPokemons) {
        let tempFPContainer = document.getElementsByClassName(`featured-pokemon ${locations[count]}`);
        featuredPokemon.renderMini(tempFPContainer[0]);
        count++;
    }
}
/**
 * Code that runs after HTML is loaded
 *
 * Data is loaded via the server
 *
 * The data is then rendered via initUI()
 *  */
window.addEventListener("load", async () => {
    let pokemonArray = [];
    const response = await axios_1.default.get('http://localhost:3000/');
    let data = response.data;
    console.log(data);
    for (let pokemonData of data) {
        pokemonArray.push(new pokemon_1.Pokemon(pokemonData.name, pokemonData));
    }
    pokemonArray = (0, pokemon_1.sortPokemonData)(pokemonArray);
    initUI(pokemonArray);
    // ! Old code below
    // discoverBtn.addEventListener("click", () => {
    //     window.location.href="discover.html";
    // })
    // let pokemonJsonURL = [];
    // // If data exists, load from localStorage
    // if (checkDataExists()) {
    //     pokemonArray = sortPokemonData(getData());
    //     initUI(pokemonArray); //!front UI
    // }
    // // If non-existent (first run) => fetch from API
    // else {
    //     // First timer? loading time is 2 seconds
    //     setTimeout(() => {
    //         clearStorage();
    //         initUI(pokemonArray) //!front UI
    //         setData(pokemonArray);
    //     }, 2000);
    //     // Acquiring URLs
    //     try {
    //         pokemonJsonURL = await loadPokemonURLS();
    //     } catch (e) { console.log(`Error!\n${e}`); }
    //     // Creating Pokemon array
    //     for (let pokemonURL of pokemonJsonURL.results) {
    //         try {
    //             // Fetching relevant data instead of everything
    //             await fetchRawData(pokemonURL).then(pokemonData => {
    //                 const customData: customData = {
    //                     img: pokemonData.sprites.other!.dream_world.front_default,
    //                     hp: pokemonData.stats[0].base_stat,
    //                     exp: pokemonData.base_experience,
    //                     height: pokemonData.height,
    //                     weight: pokemonData.weight,
    //                     types: pokemonData.types,
    //                     abilities: pokemonData.abilities
    //                 }
    //                 pokemonArray.push(new Pokemon(pokemonData.name, customData));
    //             })
    //             pokemonArray = sortPokemonData(pokemonArray);
    //         } catch (e) { console.log(`Error!\n${e}`); }
    //     }
    // }
    // let discoverBtn = document.getElementById("btn") as HTMLButtonElement
    // console.log(discoverBtn);
});
//# sourceMappingURL=app.js.map