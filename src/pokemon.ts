import { PokeData, Ability, Type } from "./pokeData"

export interface customData {
    img: string;
    hp: number;
    exp: number;
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
    //TODO: change style - delete container hardcoded
    renderPokemon() {
        if (this.parent !== undefined) {
            this.parent.innerHTML = "";
            this.parent.style.opacity = "1";
        }

        let pokemonUI = this.parent as HTMLDivElement

        let image = document.createElement("img") as HTMLImageElement;
        let pokemonImg = this.customData.img;
        image.src = pokemonImg;
        console.log(image.src);

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
            // let attackType = document.createElement("div") as HTMLDivElement;
            // attackType.classList.add("type-container")

            // for (const type of types) {
            //     let typeIcon = document.createElement("img") as HTMLImageElement
            //     typeIcon.src = `./icons/${type}.svg`
            //     typeIcon.classList.add(`${type}`)
            //     attackType.appendChild(typeIcon);
            // }

            // singleAttack.appendChild(attackType)
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

        // let type = document.createElement("div") as HTMLDivElement;
        // type.classList.add("type");
        // type.textContent = "Type:";
        // stats.appendChild(type)

        // let typesList = document.createElement("ul") as HTMLUListElement
        // typesList.id = "type-list"
        // type.appendChild(typesList)
        // for (const typeName of this.customData.types) {
        //     types.push(typeName.type.name);
        // }
        // for (const type of types) {
        //     let itemList = document.createElement("li")
        //     itemList.textContent = type
        //     let typeIcon = document.createElement("img")
        //     typeIcon.src = `./icons/${type}.svg`
        //     typeIcon.classList.add(`${type}`)
        //     itemList.appendChild(typeIcon)
        //     typesList.appendChild(itemList)
        // }


        if (this.parent !== undefined) { this.parent.appendChild(pokemonUI); }
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

        // img
        let mainImg = document.createElement("img");
        mainImg.setAttribute("src", this.customData.img);
        mainImg.classList.add("pokemon-img");
        this.parent.appendChild(mainImg);

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