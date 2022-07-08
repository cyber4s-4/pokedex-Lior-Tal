"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pokemon_1 = require("./pokemon");
const axios_1 = require("axios");
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
function searchRender(pokemonArray) {
    // Optional code for removing the "all pokemon" viewer upon clicking 'search'
    // let allPokemonViewer = document.getElementById("all-pokemon-container") as HTMLDivElement;
    // allPokemonViewer.innerHTML = "";
    // Parent element
    const parentElement = document.getElementById("pokemon-container");
    console.log(parentElement);
    // Get input text
    let inputEl = document.getElementById("search-box");
    let text = inputEl.value;
    console.log(inputEl.value);
    // Reset recent render
    let foundIndicator = false;
    // Searching by name
    for (const pokemon of pokemonArray) {
        if (text.toLowerCase() === pokemon.name) {
            // Renders at given parentElement
            inputEl.value = "";
            parentElement.innerHTML = "";
            pokemon.renderAtParent(parentElement);
            let allPokemonContainer = document.getElementById("all-pokemon-container");
            let pokemonContainer = document.getElementById("pokemon-container");
            allPokemonContainer.style.display = "none";
            pokemonContainer.style.display = "flex";
            foundIndicator = true;
        }
    }
    // Error - not found
    if (!foundIndicator) {
        inputEl.value = "";
        alert("no such pokemon, try again!");
        let allPokemonContainer = document.getElementById("all-pokemon-container");
        let pokemonContainer = document.getElementById("pokemon-container");
        allPokemonContainer.style.display = "flex";
        pokemonContainer.style.display = "none";
    }
}
/**
 * Initiates the discover page UI on "load" (after HTML is loaded)
 */
function initUI(pokemonArray) {
    const parentElement = document.getElementById("pokemon-container");
    let searchBtn = document.getElementById("search-btn");
    console.log(pokemonArray);
    searchBtn.addEventListener("click", () => searchRender(pokemonArray));
    let searchInput = document.getElementById("search-box");
    searchInput.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Trigger the button element with a click
            searchBtn.click();
        }
    });
    // Surprise button for testing surpriseMe(), renders the second random pokemon
    let surpriseBtn = document.getElementById("surprise-btn");
    // Gives surprise button instructions (log and render 1 out of 2)
    surpriseBtn.addEventListener("click", () => {
        let allPokemonContainer = document.getElementById("all-pokemon-container");
        let pokemonContainer = document.getElementById("pokemon-container");
        allPokemonContainer.style.display = "none";
        pokemonContainer.style.display = "flex";
        const randPokemons = (0, pokemon_1.surpriseMe)(pokemonArray);
        console.log(`first Pokemon: ${randPokemons[0].name}\n` +
            `Second Pokemon: ${randPokemons[1].name}`);
        randPokemons[0].parent = document.getElementById("pokemon-container");
        randPokemons[0].renderAtParent(parentElement);
    });
    let allBtn = document.getElementById("all-btn");
    allBtn.addEventListener("click", () => {
        let allPokemonContainer = document.getElementById("all-pokemon-container");
        let pokemonContainer = document.getElementById("pokemon-container");
        allPokemonContainer.style.display = "flex";
        pokemonContainer.style.display = "none";
    });
    // 
    renderAll(pokemonArray);
}
// Renders all the pokemons (separate segment under the "search" area)
function renderAll(pokemonArray) {
    const parentElement = document.getElementById("all-pokemon-container");
    for (let pokemon of pokemonArray) {
        let tempDiv = document.createElement("div");
        pokemon.renderAtParent(tempDiv);
        tempDiv.classList.add("pokemon-container");
        parentElement.appendChild(tempDiv);
    }
}
/**
 * Code that runs after HTML is loaded
 *
 * The data is loaded directly from server
 *
 * The data is then rendered via initUI()
 */
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
    // let pokemonArray: Pokemon[] = [];
    // // If data exists, load from localStorage
    // if (checkDataExists()) {
    //     console.log("exists");
    //     pokemonArray = sortPokemonData(getData());
    //     initUI(pokemonArray);
    // }
    // // In case data doesn't exist (not supposed to happen)
    // else {
    //     // Go to index.html => load data correctly
    //     alert("error, Pokemon information did not load\nClick OK to reload")
    //     window.location.href = "index.html";
    // }
});
//# sourceMappingURL=discover.js.map