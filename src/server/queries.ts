import { Client, Pool } from 'pg';
import { customData } from "../client/Typescript/pokeData";
import { MongoClient } from 'mongodb';

export const uri = 'mongodb+srv://cyber4s:pokemondata@cluster0.dw27scw.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);
const POKEMON_PAGE_LIMIT = 20;


// POSTGRES - Pagination query: returns 20 pokemons
export const getPage = 
async (myClient: Pool, pageNumber: number): Promise<customData[]> => new Promise((resolve, reject)=>{
    
    // Number of rows to skip
    const skipCount = (pageNumber - 1) * POKEMON_PAGE_LIMIT;
    
    const query = `
    SELECT pokedata FROM pokemon
    LIMIT ${POKEMON_PAGE_LIMIT}
    OFFSET $1;
    `
    
    myClient.query(query, [`${skipCount}`], async (error: Error, result: any) => {
        if (error) reject(error);
        else resolve(result.rows);
    });
});

// POSTGRES - Find pokemon by name
export const getPokemonByName = 
async (myClient: Pool, name: string): Promise<any> => new Promise((resolve, reject)=>{
    
    const query = `
    SELECT pokedata FROM pokemon
    WHERE
    pokedata->>'name' = $1
    `

    myClient.query(query,[`${name}`], async (error: Error, result: any) => {
        if (error) reject(error);
        else resolve(result.rows);
    });
})


// MongoDB - old query
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

// MongoDB - old query
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

// MongoDB - old query
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

// MongoDB - old query
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

// MongoDB - old query
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