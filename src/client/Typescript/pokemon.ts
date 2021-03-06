import axios from "axios";
import { PokeData, Ability, Type } from "./pokeData"

const NUM_OF_POKEMONS = 20;

export interface customData {
    name: string;
    img: string;
    hp: number;
    exp: number;
    height: number;
    weight: number;
    types: Type[];
    abilities: Ability[];
    favorite?: false | true
}

export class Pokemon {
    name: string;
    parent: HTMLElement | undefined;
    customData: customData;
    constructor(name: string, customData: customData, parentElement?: HTMLElement) {
        this.name = name;
        this.parent = parentElement;
        this.customData = customData;
        this.customData.exp = Math.floor(this.customData.exp);
        this.customData.hp = Math.floor(this.customData.hp);
        this.customData.height = Math.floor(this.customData.height);
        this.customData.weight = Math.floor(this.customData.weight)
    }
    //TODO: change style - delete container hardcoded
    renderPokemon() {
        if (this.parent !== undefined) {
            this.parent.innerHTML = "";
        }

        let pokemonUI = this.parent as HTMLDivElement
        pokemonUI.style.position = "relative"

        let starIcon = document.createElement("img") as HTMLImageElement;
        starIcon.src = "../icons/emptyStar.svg"

        if (this.customData.favorite) {
            starIcon.classList.add("star")
            starIcon.classList.add("filled")
        } else {
            starIcon.classList.add("star")
            starIcon.classList.add("empty")
        }
        
        starIcon.id = "fav-btn"        

        starIcon.addEventListener("click", async () => {
            if (starIcon.classList.contains("empty")) {
                starIcon.classList.remove("empty");
                starIcon.classList.add("filled")
                await axios.get(`http://localhost:3000/favorite?name=${this.name}`) 
            } else {
                starIcon.classList.remove("filled");
                starIcon.classList.add("empty")
                await axios.get(`http://localhost:3000/unfavorite?name=${this.name}`) 
            }
        })

        pokemonUI.appendChild(starIcon)

        let image = document.createElement("img") as HTMLImageElement;
        let pokemonImg = this.customData.img;
        image.src = pokemonImg;

        image.classList.add("pokemon-img")
        pokemonUI.appendChild(image)

        let detailsContainer = document.createElement("div")
        detailsContainer.classList.add("pokemon-details")
        pokemonUI.appendChild(detailsContainer)

        let pokemonName = document.createElement("h4") as HTMLHeadingElement
        pokemonName.classList.add("pokemon-name")
        pokemonName.innerText = this.name[0].toUpperCase() + this.name.slice(1);
        detailsContainer.appendChild(pokemonName)

        let stats = document.createElement("div") as HTMLDivElement;
        stats.classList.add("stats")
        detailsContainer.appendChild(stats)

        let hp = document.createElement("div") as HTMLDivElement;
        hp.classList.add("hp");
        hp.textContent = `HP: ${Math.floor((Math.random() * this.customData.hp) + 1)}/${this.customData.hp}`;
        stats.appendChild(hp)

        let exp = document.createElement("div") as HTMLDivElement;
        exp.classList.add("exp");
        exp.textContent = `EXP: ${this.customData.exp}`;
        stats.appendChild(exp)

        let weight = document.createElement("div") as HTMLDivElement;
        weight.classList.add("weight");
        weight.textContent = `Weight: ${this.customData.weight}`;
        stats.appendChild(weight)

        let height = document.createElement("div") as HTMLDivElement;
        height.classList.add("height");
        height.textContent = `Height: ${this.customData.height}`;
        stats.appendChild(height)

        let allAttacks = document.createElement("div") as HTMLDivElement;
        allAttacks.classList.add("pokemon-attacks");
        allAttacks.textContent = "Attacks:";
        detailsContainer.appendChild(allAttacks);

        let attacks: string[] = [];
        let types: string[] = [];

        let attacksList = document.createElement("ul") as HTMLUListElement
        attacksList.classList.add("attacks");
        detailsContainer.appendChild(attacksList)

        for (const ability of this.customData.abilities) {
            attacks.push(ability.ability.name);
        }

        for (const typeName of this.customData.types) {
            types.push(typeName.type.name);
        }

        for (const attack of attacks) {
            let singleAttack = document.createElement("div") as HTMLDivElement;
            singleAttack.classList.add("attack");
            let attackName = document.createElement("li") as HTMLLIElement;
            attackName.textContent = attack;
            singleAttack.appendChild(attackName);
            attacksList.appendChild(singleAttack)
        }

        let typesDiv = document.createElement("div") as HTMLDivElement;
        typesDiv.classList.add("types");
        detailsContainer.appendChild(typesDiv);

        for (const type of types) {
            let typeIcon = document.createElement("img") as HTMLImageElement
            typeIcon.src = `./icons/${type}.svg`
            typeIcon.classList.add(`${type}`)
            typeIcon.classList.add("type")
            typesDiv.appendChild(typeIcon);
        }
    }

    renderAtParent(parent: HTMLElement) {
        this.parent = parent;
        this.renderPokemon();
        this.parent = undefined;
    }

    // TODO: Implement renderMini()
    /**
     * renderMini(parent) renders a mini component, used by landing page
     * for "Featured" segment 
     * */
    renderMini(parent: Element) {

        this.parent = parent as HTMLElement;

        this.parent.innerHTML = "";
        this.parent.style.position = "relative"

        // img
        let mainImg = document.createElement("img");
        mainImg.setAttribute("src", this.customData.img);
        mainImg.classList.add("pokemon-img");
        this.parent.appendChild(mainImg);

        //star icon
        let starIcon = document.createElement("img") as HTMLImageElement;
        starIcon.src = "../icons/emptyStar.svg"
        starIcon.classList.add("star")
        starIcon.id = "fav-btn"

        starIcon.addEventListener("click", () => {
            if (starIcon.classList.contains("empty")) {
                starIcon.classList.remove("empty");
                starIcon.classList.add("filled")
            } else {
                starIcon.classList.remove("filled");
                starIcon.classList.add("empty")
            }
        })

        // description (name + type imgs)
        let descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add("description");

        // name h4
        let name = document.createElement("h4");
        name.classList.add("pokemon-name");
        name.innerText = this.name[0].toUpperCase() + this.name.slice(1);;
        descriptionDiv.appendChild(name);

        // type container
        let typeContainerDiv = document.createElement("div");
        typeContainerDiv.classList.add("type-container");

        let types = this.customData.types;

        // type 1
        let typeOne = types[0].type.name;
        let typeImgOne = document.createElement("img");
        typeImgOne.classList.add(`${typeOne}`);
        typeImgOne.setAttribute("src", `./icons/${typeOne}.svg`);
        typeContainerDiv.appendChild(typeImgOne);

        // type 2 (if exists)
        let typeImgTwo = document.createElement("img");

        if (types.length === 2) {
            let typeTwo = types[1].type.name;
            typeImgTwo.classList.add(`${typeTwo}`);
            typeImgTwo.setAttribute("src", `./icons/${typeTwo}.svg`);
        } else {
            typeImgTwo.setAttribute("src", ``);
        }
        typeContainerDiv.appendChild(typeImgTwo);

        descriptionDiv.appendChild(typeContainerDiv);

        this.parent.appendChild(descriptionDiv);

        this.parent = undefined;
    }
}

// Generates 3 random pokemons
export function surpriseMe(pokemonArray: Pokemon[]): Pokemon[] {
    let firstRandomPokemon = Math.floor(Math.random() * NUM_OF_POKEMONS);
    let secondRandomPokemon = Math.floor(Math.random() * NUM_OF_POKEMONS);
    let thirdRandomPokemon = Math.floor(Math.random() * NUM_OF_POKEMONS)

    if (firstRandomPokemon === secondRandomPokemon) { firstRandomPokemon++; }
    else if (firstRandomPokemon === thirdRandomPokemon) { firstRandomPokemon++; }
    else if (thirdRandomPokemon === secondRandomPokemon) { secondRandomPokemon++; }

    const randomPokemonArray = [
        pokemonArray[firstRandomPokemon],
        pokemonArray[secondRandomPokemon],
        pokemonArray[thirdRandomPokemon]
    ]

    return randomPokemonArray;
}

// Sorts array alphabetically - will be used for Autofill
export function sortPokemonData(pokemonArray: Pokemon[]): Pokemon[] {
    return pokemonArray.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });
}