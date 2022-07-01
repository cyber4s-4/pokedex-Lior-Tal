import { PokeData, Ability, Type } from "./pokeData"

export interface customData {
    img: string;
    height: number;
    weight: number;
    types: Type[];
    abilities: Ability[];
}

export class Pokemon {
    name: string;
    parent: HTMLElement | undefined;
    customData: customData;
    constructor(name: string, customData: customData, parentElement?: HTMLElement) {
        this.name = name;
        this.parent = parentElement;
        this.customData = customData;
    }

    renderPokemon() {
        if (this.parent !== undefined) {
            this.parent.innerHTML = "";
        }

        let pokemonUI = document.createElement("ul") as HTMLUListElement;
        pokemonUI.setAttribute("id", "details-list");
        pokemonUI.classList.add("details-list");

        let image = document.createElement("img") as HTMLImageElement;
        let pokemonImg = this.customData.img;
        image.src = pokemonImg;
        image.classList.add("pokemon-img")
        pokemonUI.appendChild(image)

        let detailsContainer = document.createElement("div")
        detailsContainer.classList.add("details-container")
        pokemonUI.appendChild(detailsContainer)

        let height = document.createElement("li") as HTMLLIElement;
        height.classList.add("height");
        height.textContent = `Height: ${this.customData.height}`;
        detailsContainer.appendChild(height)

        let weight = document.createElement("li") as HTMLLIElement;
        weight.classList.add("weight");
        weight.textContent = `Weight: ${this.customData.weight}`;
        detailsContainer.appendChild(weight)

        let type = document.createElement("li") as HTMLLIElement;
        type.classList.add("type");
        type.textContent = "Type:";
        detailsContainer.appendChild(type)

        let types: string[] = [];
        let typesList = document.createElement("ul") as HTMLUListElement
        typesList.id = "type-list"
        type.appendChild(typesList)
        for (const typeName of this.customData.types) {
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
        for (const ability of this.customData.abilities) {
            abilities.push(ability.ability.name);
        }
        for (const ability of abilities) {
            let itemList = document.createElement("li")
            itemList.textContent = ability
            abilitiesList.appendChild(itemList)
        }

        if(this.parent!== undefined){ this.parent.appendChild(pokemonUI); }
    }
    renderAtParent(parent: HTMLElement){
        this.parent = parent;
        this.renderPokemon();
        this.parent = undefined;
    }
}