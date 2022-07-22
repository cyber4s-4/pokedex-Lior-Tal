import { customData } from "../client/Typescript/pokeData";
import { MongoClient } from 'mongodb';

export const uri = 'mongodb+srv://cyber4s:pokemondata@cluster0.dw27scw.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);
const POKEMON_PAGE_LIMIT = 20;

// Global scope array - resets upon request and returned to client

// Pagination query - returns 20 pokemon data JSON
export async function main(pageNumber: number): Promise<customData[]> {

    let pokeDataArray: customData[] = [];
    
    try {
        

        await client.connect()

        // Number of documents to skip
        const skipCount = (pageNumber - 1) * POKEMON_PAGE_LIMIT;

        const pokeDB = client.db("pokeDataBase");

        const pokeData_collection = pokeDB.collection<customData>("pokeData");

        const findPokemon = pokeData_collection.find<customData>({}).skip(skipCount).limit(POKEMON_PAGE_LIMIT);

        await findPokemon.forEach(document => {
            pokeDataArray.push(document);
        })

    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
        return pokeDataArray;
    }
}

// Search query (find by name)
export async function searchAll(pokemonName: string): Promise<customData[]> {

    let pokeDataArray: customData[] = [];

    try {

        await client.connect();

        const pokeDB = client.db("pokeDataBase");

        const pokeData_collection = pokeDB.collection<customData>("pokeData");

        const findPokemon = pokeData_collection.findOne<customData>({ name: pokemonName })

        await findPokemon.then((result) => {
            // If found pokemon, push to array
            if (result !== null) { 
                pokeDataArray.push(result); 
            }
            // NOTE: if result is null, array is empty (for error handling)
        })
    }
    catch (error) {
        console.log(error);
    }
    finally {
        await client.close();
        return pokeDataArray;
    }
}

// Search query (find by name)
export async function allFav(): Promise<customData[]> {
    
    let pokeDataArray: customData[] = [];
    
    try {

        await client.connect();

        const pokeDB = client.db("pokeDataBase");

        const pokeData_collection = pokeDB.collection<customData>("pokeData");

        const findPokemon = pokeData_collection.find<customData>({ favorite: true })

        pokeDataArray = [];

        await findPokemon.forEach(document => {
            pokeDataArray.push(document);
        })
    }
    
    catch (error) {
        console.log(error);
    }
    finally {
        await client.close();
        return pokeDataArray;
    }
}

// Search query (find by name) for updating favorite pokemon.
export async function updateFavorite(pokemonName: string) {
    try {
        
        await client.connect();

        const pokeDB = client.db("pokeDataBase");

        const pokeData_collection = pokeDB.collection<customData>("pokeData");

        const updatePokemon = pokeData_collection.updateOne({ name: pokemonName }, { $set: { favorite: true} })

        await updatePokemon.then(result => console.log(result))
    }

    catch (error) {
        console.log(error);
    }

    finally {
        await client.close();
    }
}

// Search query (find by name) for updating favorite pokemon.
export async function updateFavoriteFalse(pokemonName: string) {
    try {
        await client.connect();

        const pokeDB = client.db("pokeDataBase");

        const pokeData_collection = pokeDB.collection<customData>("pokeData");

        const updatePokemon = pokeData_collection.updateOne({ name: pokemonName }, { $set: { favorite: false} })

        await updatePokemon.then(result => console.log(result))
    }

    catch (error) {
        console.log(error);
    }

    finally {
        await client.close();
    }
}