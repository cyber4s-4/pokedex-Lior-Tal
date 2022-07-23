/**
 * discover.ts is used by discover.html ("Discover page")
 * It renders Pokemon information in the UI, via 'search' & 'Surprise me!' button.
 */

import { Pokemon, customData, surpriseMe, sortPokemonData } from "./pokemon";
import { randomPagePokemonArray } from "./app";
import { checkDataExists, getData } from "./localStorage";
import { PokeData } from "./pokeData";
import axios from "axios";
import { raw } from "body-parser";

let originLink: string;
// Acquire API link (gulp/heroku instance)
if (window.location.origin.includes("localhost")) {
    originLink = "http://localhost:3000"
} else originLink = window.location.origin;

// Maximum page number for discover segment (Pokemons on DB divided by 20 per page)
const MAX_PAGE_NUM = 500;

/**
 * Searches for a match on the database for the user's input
 * Renders the found Pokemon object's UI component (includes error handling)
 */
async function searchRender() {

    // Optional code for removing the "all pokemon" viewer upon clicking 'search'

    // let allPokemonViewer = document.getElementById("all-pokemon-container") as HTMLDivElement;
    // allPokemonViewer.innerHTML = "";

    // Parent element
    const parentElement = document.getElementById("pokemon-container") as HTMLElement;
    console.log(parentElement);


    // Get input text
    let inputEl = document.getElementById("search-box") as HTMLInputElement
    let text = inputEl.value;
    console.log(inputEl.value);
    // Reset recent render

    let foundIndicator = false;
    let allPokemonContainer = document.getElementById("all-pokemon-container") as HTMLElement
    let pokemonContainer = document.getElementById("pokemon-container") as HTMLElement

    // Making a search request through the API
    const searchResponse: any = await axios.get(`${originLink}/search-pg?name=${text.toLowerCase()}`);

    let data: any;

    // Error - not found
    if (searchResponse.data === "Not found") {
        inputEl.value = "";
        alert("no such pokemon, try again!");

        allPokemonContainer.style.display = "flex";
        pokemonContainer.style.display = "none";
    }

    // Found pokemon on database, creates Pokemon object, renders it
    else {
        data = searchResponse.data.pokedata as customData;
        const foundPokemon: Pokemon = new Pokemon(data.name, data)
        // Renders at given parentElement
        inputEl.value = "";
        parentElement.innerHTML = "";
        foundPokemon.renderAtParent(parentElement);
        allPokemonContainer.style.display = "none";
        pokemonContainer.style.display = "flex";
        foundIndicator = true;
    }
}

async function showFavorites() {
    const parentElement = document.getElementById("pokemon-container") as HTMLElement;
    let allPokemonContainer = document.getElementById("all-pokemon-container") as HTMLElement

    const searchResponse = await axios.get(`${originLink}/allFav`);

    let data: customData[] = searchResponse.data;

    let pokemonArr: Pokemon[] = [];

    
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            parentElement.innerHTML = "";
            const newPokemon: Pokemon = new Pokemon(data[i].name, data[i])
            pokemonArr.push(newPokemon)
        }
    } else {
        alert("no favorite pokemon!");
    }
    
    console.log(pokemonArr);
    renderAll(pokemonArr)
}

/**
 * Initiates the discover page UI on "load" (after HTML is loaded)
 */
function initUI(pokemonArray: Pokemon[], currentPage: number): void {

    const parentElement = document.getElementById("pokemon-container") as HTMLElement;

    let searchBtn = document.getElementById("search-btn") as HTMLButtonElement;
    console.log(pokemonArray);

    searchBtn.addEventListener("click", () => searchRender())

    let favoriteBtn = document.getElementById("favorite-btn") as HTMLButtonElement

    favoriteBtn.addEventListener("click", () => showFavorites())

    let searchInput = document.getElementById("search-box") as HTMLInputElement;

    // Enter key integration
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            searchBtn.click();
        }
    });

    // Surprise button for testing surpriseMe(), renders the second random pokemon
    let surpriseBtn = document.getElementById("surprise-btn") as HTMLButtonElement;

    // Gives surprise button instructions
    surpriseBtn.addEventListener("click", async () => {

        // Get random pokemon page from api
        let allPokemonContainer = document.getElementById("all-pokemon-container") as HTMLElement
        let pokemonContainer = document.getElementById("pokemon-container") as HTMLElement
        allPokemonContainer.style.display = "none";
        pokemonContainer.style.display = "flex";

        await randomPagePokemonArray().then(randomPokemonArray => {
            const randPokemons: Pokemon[] = surpriseMe(randomPokemonArray);
            randPokemons[0].parent = document.getElementById("pokemon-container") as HTMLElement;
            randPokemons[0].renderAtParent(parentElement);
        })

    });

    // Show all button (removes search/surprise filters)
    let allBtn = document.getElementById("all-btn") as HTMLButtonElement;

    allBtn.addEventListener("click", () => {
        let allPokemonContainer = document.getElementById("all-pokemon-container") as HTMLElement
        let pokemonContainer = document.getElementById("pokemon-container") as HTMLElement
        allPokemonContainer.style.display = "flex";
        pokemonContainer.style.display = "none";
    });

    // 'Previous' and 'Next' buttons
    let previousPage: number = currentPage - 1;
    if (previousPage === 0) { previousPage++; }

    let nextPage: number = currentPage + 1;
    if (nextPage === MAX_PAGE_NUM) { previousPage--; }

    const leftButton = document.getElementById("left-btn");
    leftButton?.setAttribute("onclick", `window.location.search='page=${previousPage.toString()}';`);

    const rightButton = document.getElementById("right-btn");
    rightButton?.setAttribute("onclick", `window.location.search='page=${nextPage.toString()}';`);


    // Render all Pokemons
    renderAll(pokemonArray);
}

// Renders all the pokemons (separate segment under the "search" area)
function renderAll(pokemonArray: Pokemon[]): void {
    const parentElement = document.getElementById("all-pokemon-container") as HTMLElement;
    parentElement.innerHTML = ""

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
 * The data is loaded directly from server
 * 
 * The data is then rendered via initUI()
 */
window.addEventListener("load", async () => {


    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const currentPage = parseInt(urlParams.get('page')!);

    let pokemonArray: Pokemon[] = [];

    const response: any = await axios.get(`${originLink}/data-pg?page=${currentPage}`);
    const rawDataArray = response.data;
    
    for (let result of rawDataArray) {
        const pokemonData: customData = result.pokedata;
        pokemonArray.push(new Pokemon(pokemonData.name, pokemonData));
    }

    pokemonArray = sortPokemonData(pokemonArray);

    // Render after pokemonArray is created and sorted
    initUI(pokemonArray, currentPage);

})
