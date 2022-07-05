import { Pokemon, customData, surpriseMe, sortPokemonData } from "./pokemon";
import { checkDataExists, getData } from "./localStorage"

/**
 * discover.ts is used by discover.html ("Discover page")
 * discover.ts renders Pokemon information in the UI, wether by search
 * or by "Surprise me!" button.
 */

/**
 * searchRender() occurs on each 'Search' click
 * Searches for a match on the database for the user's input
 * Renders the found Pokemon object's UI component
 * If unfound - gives relevant alert
 */
function searchRender(pokemonArray: Pokemon[]) {

    // Optional code for removing the "all pokemon" viewer upon clicking 'search'
    
    // let allPokemonViewer = document.getElementById("all-pokemon-container") as HTMLDivElement;
    // allPokemonViewer.innerHTML = "";

    // Parent element
    const parentElement = document.getElementById("pokemon-container") as HTMLElement;
    console.log(parentElement);


    // Get input text
    let inputEl = document.getElementById("search-box") as HTMLInputElement
    let text = inputEl.value;

    // Reset recent render
    parentElement.innerHTML = "";

    let foundIndicator = false;

    // Searching by name
    for (const pokemon of pokemonArray) {
        if (text.toLowerCase() === pokemon.name) {

            // Renders at given parentElement
            pokemon.renderAtParent(parentElement);
            foundIndicator = true;
        }
    }
    // Error - not found
    if (!foundIndicator) {
        alert("no such pokemon, try again!");
        parentElement.setAttribute("style", "opacity: 0");
    }
}

/**
 * Initiates the discover page UI on "load" (after HTML is loaded)
 */
function initUI(pokemonArray: Pokemon[]): void {
    const parentElement = document.getElementById("pokemon-container") as HTMLElement;

    let searchBtn = document.getElementById("search-btn") as HTMLButtonElement;
    console.log(pokemonArray);

    searchBtn.addEventListener("click", () => searchRender(pokemonArray))

    let searchInput = document.getElementById("search-box") as HTMLInputElement;

    searchInput.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Trigger the button element with a click
            searchBtn.click();
        }
    });

    // Surprise button for testing surpriseMe(), renders the second random pokemon
    let surpriseBtn = document.getElementById("surprise-btn") as HTMLButtonElement;

    // Gives surprise button instructions (log and render 1 out of 2)
    surpriseBtn.addEventListener("click", () => {
        const randPokemons: Pokemon[] = surpriseMe(pokemonArray);
        console.log(`first Pokemon: ${randPokemons[0].name}\n` +
            `Second Pokemon: ${randPokemons[1].name}`);

        randPokemons[0].parent = document.getElementById("pokemon-container") as HTMLElement;
        randPokemons[0].renderAtParent(parentElement);
    });

    // 
    renderAll(pokemonArray);
}

// Renders all the pokemons (separate segment under the "search" area)
function renderAll(pokemonArray: Pokemon[]): void {
    const parentElement = document.getElementById("all-pokemon-container") as HTMLElement;

    for (let pokemon of pokemonArray) {
        let tempDiv = document.createElement("div") as HTMLDivElement;
        pokemon.renderAtParent(tempDiv);
        tempDiv.classList.add("pokemon-container");
        parentElement.appendChild(tempDiv);
    }
}

/**
 * Code that runs after HTML is loaded
 * 
 * The data is loaded directly from localStorage, since the user client
 * already requested the information from Pokemon API in the landing page
 * In case localStorage is empty (ideally will happen only in development)
 * the user is sent back to landing page to load load info from API
 * 
 * The data is then rendered via initUI()
 */
window.addEventListener("load", async () => {

    let pokemonArray: Pokemon[] = [];

    // If data exists, load from localStorage
    if (checkDataExists()) {
        console.log("exists");
        pokemonArray = sortPokemonData(getData());
        initUI(pokemonArray);
    }
    // In case data doesn't exist (not supposed to happen)
    else {
        // Go to index.html => load data correctly
        alert("error, Pokemon information did not load\nClick OK to reload")
        window.location.href = "index.html";
    }
})
