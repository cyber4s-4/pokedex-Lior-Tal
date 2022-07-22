import { Pokemon, customData, sortPokemonData, surpriseMe } from "./pokemon";
import { PokeData } from "./pokeData";
import axios from "axios";

const MAX_PAGE_NUM = 5000;

let originLink: string;
// Acquire API link (gulp/heroku instance)
if (window.location.origin.includes("localhost")) {
    originLink = "http://localhost:3000"
} else originLink = window.location.origin;

/**
 * app.ts is used by index.html ("Landing page")
 * app.ts is in charge of API data fetching, renders "Featured Pokemon" segment
 * and "Discover" button
 *  */ 

// Can be changed for array size config
const NUM_OF_POKEMONS = 151;

// URL json for fetch
interface pokemonURLJson {
    url: string
}

/*
! DEPRECATED - no longer in use because of MongoDB API server integration 
Initial pokemon data fetch (GET) => Gets json with 
'pokemon-name': 'URL' for each pokemon
*/
async function loadPokemonURLS() {

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${NUM_OF_POKEMONS}`)
    const pokemons = await response.json();
    // console.log(response);

    return pokemons;

}

// Fetch from URL
// ! DEPRECATED - no longer in use because of MongoDB API server integration 
async function fetchRawData(pokemon: pokemonURLJson): Promise<PokeData> {
    return await fetch(pokemon.url)
        .then(response => response.json())
}

// Returns Pokemon 20 object array from random page
export async function randomPagePokemonArray() {
    
    let pokemonArray: Pokemon[] = [];
    
    let randomPage = Math.floor(Math.random() * MAX_PAGE_NUM);

    // Acquiring random 20 pokemons from API
    const response = await axios.get(`${originLink}/data?page=${randomPage}`);
    let data: customData[] = response.data;
    
    for (let pokemonData of data) {
        pokemonArray.push(new Pokemon(pokemonData.name, pokemonData));
    }

    return pokemonArray;
}

/**
 * Initiates the landing page UI on "load" (after HTML is loaded)
 */
function initUI(pokemonArray: Pokemon[]): void {

    const featuredPokemons = surpriseMe(pokemonArray);
    let count = 1;
    let locations = ['','left','center','right'];

    
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
    
    // Acquiring random 20 Pokemon array from API, inits UI
    
    await randomPagePokemonArray().then(pokemonArray=>{
        pokemonArray = sortPokemonData(pokemonArray);
        initUI(pokemonArray);
    });

});