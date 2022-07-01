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

//! supriseMe