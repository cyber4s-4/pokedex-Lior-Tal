import { Pokemon, customData } from "./pokemon";
import { PokeData } from "./pokeData";
import { checkDataExists, setData, getData } from "./localStorage"

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
    console.log(response);

    return pokemons;

}

// Fetch from URL
async function fetchRawData(pokemon: pokemonURLJson): Promise<PokeData> {
    return await fetch(pokemon.url)
        .then(response => response.json())
}

/**
 * The action that occurs on each 'Search' click
 * Searches for a match on the database for the user's input
 * Renders the found Pokemon object's UI component
 * If unfound - gives relevant alert
 */
function searchRender(pokemonArray: Pokemon[]) {
    // Parent element
    const parentElement = document.getElementById("pokemon-container") as HTMLElement;
    
    // Get input text
    let inputEl = document.getElementById("search-box") as HTMLInputElement
    let text = inputEl.value;

    // Reset recent render
    let description = document.getElementById("details-list") as HTMLUListElement
    description.innerHTML = "";

    let foundIndicator = false;

    // Searching by name
    for (const pokemon of pokemonArray) {
        // console.log(pokemonData.name);
        if (text.toLowerCase() === pokemon.name) {
            
            // Renders at given parentElement
            pokemon.renderAtParent(parentElement);
            foundIndicator = true;
        }
    }
    // Error - not found
    if (!foundIndicator) {
        alert("no such pokemon, try again!");
    }
}

// Generates 2 random pokemons
function surpriseMe(pokemonArray: Pokemon[]): Pokemon[] {
    const firstRandomPokemon = Math.floor(Math.random() * NUM_OF_POKEMONS);
    const secondRandomPokemon = Math.floor(Math.random() * NUM_OF_POKEMONS)

    const randomPokemonArray = [
        pokemonArray[firstRandomPokemon],
        pokemonArray[secondRandomPokemon]
    ]

    return randomPokemonArray;
}

// Sorts array alphabetically - will be used for Autofill
function sortPokemonData(pokemonArray: Pokemon[]): Pokemon[] {
    return pokemonArray.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });
}

/**
 * Initiates the page UI on "load" (after HTML is loaded)
 */

function initUI(pokemonArray: Pokemon[]): void {
    const parentElement = document.getElementById("pokemon-container") as HTMLElement;

    let searchBtn = document.getElementById("search-btn") as HTMLButtonElement;
    console.log(pokemonArray);
    
    searchBtn.addEventListener("click", ()=>searchRender(pokemonArray))

    let searchInput = document.getElementById("search-box") as HTMLInputElement;

    searchInput.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Trigger the button element with a click
            searchBtn.click();
        }
    });

    // Surprise button for testing surpriseMe(), renders the second random pokemon
    let banner = document.getElementsByTagName("h1");
    let surpriseBtn = document.createElement("button");
    surpriseBtn.innerText = "Surprise Me! (console.log)"

    // Gives surprise button instructions (log and render 1 out of 2)
    surpriseBtn.addEventListener("click", () => {
        const randPokemons: Pokemon[] = surpriseMe(pokemonArray);
        console.log(`first Pokemon: ${randPokemons[0].name}\n` +
            `Second Pokemon: ${randPokemons[1].name}`);

        randPokemons[0].parent = document.getElementById("pokemon-container") as HTMLElement;
        randPokemons[0].renderAtParent(parentElement);
    });

    banner[0].appendChild(surpriseBtn);
}

window.addEventListener("load", async () => {

    let pokemonJsonURL = [];
    let pokemonArray: Pokemon[] = [];

    // If data exists, load from localStorage
    if (checkDataExists()) {
        pokemonArray = sortPokemonData(getData());
        initUI(pokemonArray);
        // console.log(pokemonArray);
    }
    // If non-existent (first run) => fetch from API
    else {
        // First timer? loading time is 2 seconds
        setTimeout(() => {
            initUI(pokemonArray)
            console.log(pokemonArray);
            setData(pokemonArray);
        }, 2000);

        // Acquiring URLs
        try {
            pokemonJsonURL = await loadPokemonURLS();

        } catch (e) { console.log(`Error!\n${e}`); }

        // Creating Pokemon array
        for (let pokemonURL of pokemonJsonURL.results) {
            try {
                // Fetching relevant data instead of everything
                await fetchRawData(pokemonURL).then(pokemonData => {
                    const customData: customData = {
                        img: pokemonData.sprites.front_default,
                        height: pokemonData.height,
                        weight: pokemonData.weight,
                        types: pokemonData.types,
                        abilities: pokemonData.abilities
                    }
                    pokemonArray.push(new Pokemon(pokemonData.name, customData));
                })
                pokemonArray = sortPokemonData(pokemonArray);

            } catch (e) { console.log(`Error!\n${e}`); }
        }
    }
})
