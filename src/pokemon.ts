import { PokeData } from "./pokeData"

export default class Pokemon {
    data: PokeData;
    parent: HTMLElement;
    // parent: HTMLUListElement;
    constructor(data: PokeData, parentElement: HTMLElement) {
        this.data = data;
        this.parent = parentElement;
    }

    renderPokemon() {
        this.parent.innerHTML = "";

        let pokemonUI = document.createElement("ul") as HTMLUListElement;
        pokemonUI.setAttribute("id","details-list");
        pokemonUI.classList.add("details-list");

        let image = document.createElement("img") as HTMLImageElement;
        let pokemonImg = this.data.sprites.front_default;
        image.src = pokemonImg;
        image.classList.add("pokemon-img")
        pokemonUI.appendChild(image)

        let detailsContainer = document.createElement("div")
        detailsContainer.classList.add("details-container")
        pokemonUI.appendChild(detailsContainer)

        let height = document.createElement("li") as HTMLLIElement;
        height.classList.add("height");
        height.textContent = `Height: ${this.data.height}`;
        detailsContainer.appendChild(height)

        let weight = document.createElement("li") as HTMLLIElement;
        weight.classList.add("weight");
        weight.textContent = `Weight: ${this.data.weight}`;
        detailsContainer.appendChild(weight)

        let type = document.createElement("li") as HTMLLIElement;
        type.classList.add("type");
        type.textContent = "Type:";
        detailsContainer.appendChild(type)

        let types: string[] = [];
        let typesList = document.createElement("ul") as HTMLUListElement
        typesList.id = "type-list"
        type.appendChild(typesList)
        for (const typeName of this.data.types) {
            types.push(typeName.type.name);
        }
        for (const type of types) {
            let itemList = document.createElement("li")
            itemList.textContent = type
            let typeIcon = document.createElement("img")
            typeIcon.src = `./icons/${type}.svg`
            typeIcon.classList.add(`${type}`)
            itemList.appendChild(typeIcon)
            typesList.appendChild(itemList)
        }

        let allAbilities = document.createElement("li") as HTMLLIElement;
        allAbilities.classList.add("abilities");
        allAbilities.textContent = "Abilities:";
        detailsContainer.appendChild(allAbilities);

        let abilities: string[] = [];
        let abilitiesList = document.createElement("ul") as HTMLUListElement
        abilitiesList.id = "ability-list"
        allAbilities.appendChild(abilitiesList)
        for (const ability of this.data.abilities) {
            abilities.push(ability.ability.name);
        }
        for (const ability of abilities) {
            let itemList = document.createElement("li")
            itemList.textContent = ability
            abilitiesList.appendChild(itemList)
        }

        this.parent.appendChild(pokemonUI);
    }
}