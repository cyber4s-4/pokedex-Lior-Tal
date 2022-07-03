
import { PokeData } from './pokeData';
import { Pokemon, customData } from './pokemon';
// localStorage.ts exports functions that help us make changes in localStorage

// A data key that we'll use throughout the project for localStorage
export const dataKey = 'pokeDataArray';

// Returns true if dataKey already exists
export function checkDataExists(): boolean {
    return (localStorage.getItem(dataKey) !== null);
}

export function clearStorage(): void {
    localStorage.clear()
}

// This function saves a pokeData array on localStorage
export function setData(pokemonArray: Pokemon[]): void {

    console.log(pokemonArray[0]);

    console.log(JSON.stringify(pokemonArray));

    localStorage.setItem(dataKey, JSON.stringify(pokemonArray));
}

// This function returns the pokeData array from localStorage
export function getData(): Pokemon[] {
    const jsonArray = JSON.parse(localStorage.getItem(dataKey)!) as Pokemon[];
    let pokemonArray: Pokemon[] = [];
    for (let rawData of jsonArray) {
        const customData = {
            img: rawData.customData.img,
            hp: rawData.customData.hp,
            exp: rawData.customData.exp,
            height: rawData.customData.height,
            weight: rawData.customData.weight,
            types: rawData.customData.types,
            abilities: rawData.customData.abilities
        }

        pokemonArray.push(new Pokemon(rawData.name, customData, rawData.parent));
    }
    return pokemonArray;
}



