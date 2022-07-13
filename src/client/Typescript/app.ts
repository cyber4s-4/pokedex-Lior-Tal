import { Pokemon, customData, sortPokemonData, surpriseMe } from "./pokemon";
import { PokeData } from "./pokeData";
import { checkDataExists, setData, getData, clearStorage } from "./localStorage"
import axios from "axios";

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
async function fetchRawData(pokemon: pokemonURLJson): Promise<PokeData> {
    return await fetch(pokemon.url)
        .then(response => response.json())
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

    let pokemonArray: Pokemon[] = [];
    
    const response = await axios.get('/data');
    let data: customData[] = response.data;
    // console.log(data);
    for (let pokemonData of data) {
        pokemonArray.push(new Pokemon(pokemonData.name, pokemonData));
    }
    pokemonArray = sortPokemonData(pokemonArray);
    initUI(pokemonArray);
})