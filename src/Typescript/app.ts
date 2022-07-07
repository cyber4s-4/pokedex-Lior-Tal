import { Pokemon, customData, sortPokemonData, surpriseMe } from "./pokemon";
import { PokeData } from "./pokeData";
import { checkDataExists, setData, getData, clearStorage } from "./localStorage"

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
    console.log(response);

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
 * Landing page loads the Pokemon information from the API in order to 
 * achieve background loading time without the user noticing. User will 
 * click "discover" and will be redirected to the page that shows the actual 
 * Pokedex, when data is already loaded to localStorage
 * 
 * The data is then rendered via initUI()
 *  */ 
window.addEventListener("load", async () => {    

    
    
    // discoverBtn.addEventListener("click", () => {
    //     window.location.href="discover.html";
    // })

    let pokemonJsonURL = [];
    let pokemonArray: Pokemon[] = [];

    // If data exists, load from localStorage
    if (checkDataExists()) {
        pokemonArray = sortPokemonData(getData());
        initUI(pokemonArray); //!front UI
    }
    // If non-existent (first run) => fetch from API
    else {
        // First timer? loading time is 2 seconds
        setTimeout(() => {
            clearStorage();
            initUI(pokemonArray) //!front UI
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
                        img: pokemonData.sprites.other!.dream_world.front_default,
                        hp: pokemonData.stats[0].base_stat,
                        exp: pokemonData.base_experience,
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

    let discoverBtn = document.getElementById("btn") as HTMLButtonElement
    console.log(discoverBtn);
})
