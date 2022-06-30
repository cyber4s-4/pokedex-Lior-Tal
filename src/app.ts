import Pokemon from "./pokemon";
import { PokeData } from "./pokeData"

let pokeDataArray: PokeData[] = [];

interface pokemonURLJson {
    url: string
}

/* 
Initial pokemon data fetch (GET) => Gets json with 
'pokemon-name': 'URL' for each pokemon, sends the data
to fetchPokemonData()
*/
async function pokemonData() {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
    let json = response.json();
    json.then(allPokemon =>
        allPokemon.results.forEach((pokemon: pokemonURLJson) => fetchPokemonData(pokemon)));
}


/**
 * Uses data fetched by pokemonData(), fetches given pokemonURLJson's
 * raw data => pushes it to pokeDataArray array
 */
function fetchPokemonData(pokemon: pokemonURLJson) {
    let url = pokemon.url;
    fetch(url)
        .then(response => response.json())
        .then(data => pokeDataArray.push(data))
}

/**
 * The action that occurs on each 'Search' click
 * Searches for a match on the database for the user's input
 * Renders the found Pokemon object's UI component
 */
function insertData() {
    let pokemonUIParent = document.getElementById("pokemon-container") as HTMLElement;
    let inputEl = document.getElementById("search-box") as HTMLInputElement
    let text = inputEl.value;
    let description = document.getElementById("details-list") as HTMLUListElement
    description.innerHTML = ""
    let foundIndicator = false;
    for (const pokemonData of pokeDataArray) {
        if (text.toLowerCase() === pokemonData.name) {
            console.log(pokemonData);
            let newPokemon = new Pokemon(pokemonData, pokemonUIParent);
            newPokemon.renderPokemon();
            foundIndicator = true;
        }   
    }
    if (!foundIndicator) {
        alert("no such pokemon, try again!");
    }
}

/**
 * Initiates the page UI on "load" (after HTML is loaded)
 */
window.addEventListener("load", () => {
    pokemonData()
    console.log(pokeDataArray);

    let searchBtn = document.getElementById("search-btn") as HTMLButtonElement;
    searchBtn.addEventListener("click", insertData)

    let searchInput = document.getElementById("search-box") as HTMLInputElement;
    searchInput.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Trigger the button element with a click
            searchBtn.click();
        }
    });
})
