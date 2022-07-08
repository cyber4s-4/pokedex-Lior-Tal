"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = exports.setData = exports.clearStorage = exports.checkDataExists = exports.dataKey = void 0;
const pokemon_1 = require("./pokemon");
// localStorage.ts exports functions that help us make changes in localStorage
// A data key that we'll use throughout the project for localStorage
exports.dataKey = 'pokeDataArray';
// Returns true if dataKey already exists
function checkDataExists() {
    return (localStorage.getItem(exports.dataKey) !== null);
}
exports.checkDataExists = checkDataExists;
function clearStorage() {
    localStorage.clear();
}
exports.clearStorage = clearStorage;
// This function saves a pokeData array on localStorage
function setData(pokemonArray) {
    console.log(pokemonArray[0]);
    console.log(JSON.stringify(pokemonArray));
    localStorage.setItem(exports.dataKey, JSON.stringify(pokemonArray));
}
exports.setData = setData;
// This function returns the pokeData array from localStorage
function getData() {
    const jsonArray = JSON.parse(localStorage.getItem(exports.dataKey));
    let pokemonArray = [];
    for (let rawData of jsonArray) {
        const customData = {
            img: rawData.customData.img,
            hp: rawData.customData.hp,
            exp: rawData.customData.exp,
            height: rawData.customData.height,
            weight: rawData.customData.weight,
            types: rawData.customData.types,
            abilities: rawData.customData.abilities
        };
        pokemonArray.push(new pokemon_1.Pokemon(rawData.name, customData, rawData.parent));
    }
    return pokemonArray;
}
exports.getData = getData;
//# sourceMappingURL=localStorage.js.map