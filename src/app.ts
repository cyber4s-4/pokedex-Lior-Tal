import Pokemon from "./pokemon";

let allPokemons: any[] = [];

async function pokemonData() {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
    let json = response.json();
    json.then(allPokemon => allPokemon.results.forEach((pokemon: { url: string; }) => fetchPokemonData(pokemon)));
}

function fetchPokemonData(pokemon: { url: string }) {
    let url = pokemon.url;
    fetch(url)
        .then(response => response.json())
        .then(data => allPokemons.push(data))
}

function insertData() {
    let inputEl = document.getElementById("search-box") as HTMLInputElement
    let text = inputEl.value;
    let description = document.getElementById("details-list") as HTMLUListElement
    description.innerHTML = ""
    for (const pokemon of allPokemons) {
        if (text === pokemon.name) {
            let newPokemon = new Pokemon(pokemon)
            newPokemon.renderPokemon()
        }
    }
}

window.addEventListener("load", () => {
    pokemonData()
    console.log(allPokemons);
    
    let searchBtn = document.getElementById("search-btn") as HTMLButtonElement;
    searchBtn.addEventListener("click", insertData)
})
