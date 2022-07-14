import { Pokemon, customData, sortPokemonData, surpriseMe } from "./pokemon";
import axios from "axios";

/**
 * app.ts is used by index.html ("Landing page")
 * app.ts is in charge of API data fetching, renders "Featured Pokemon" segment
 * and "Discover" button
 *  */ 

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