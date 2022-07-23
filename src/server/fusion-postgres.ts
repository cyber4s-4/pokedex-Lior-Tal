
import { Pool } from 'pg';
import { customData } from "../client/Typescript/pokeData";
import { MongoClient } from 'mongodb'
import { uri } from './server'

const DATABASE_URL = `postgres://sugivyejdjefcn:12ae2f93e7ac3f60b980821d5e04da5d61d9cc4fc463071f19b21f18945ed1cd@ec2-3-223-169-166.compute-1.amazonaws.com:5432/d4e5r4bgdqcmdo`;
const mongoClient = new MongoClient(uri);

// Establishes connection
const pgClient = new Pool({
    connectionString: DATABASE_URL
    ,
    ssl: {
        rejectUnauthorized: false
    }
});

// postgres first query (table)
const createTableQuery = ` 
CREATE TABLE "pokemon" (
    id TEXT NOT NULL PRIMARY KEY,
    pokedata JSONB NOT NULL
    )
    `

// Creates table
pgClient.query(createTableQuery, (err, res) => {
    if (err) console.log(err);
    else {
        console.log("created table");
        console.log(res);
    };
});

fusion();

// Randomizes pokemon data 10,000 times
async function fusion() {
    try {

        await mongoClient.connect().then(async () => {

            console.log("Connected to mongo");

            for (let i = 1; i < 10001; i++) {
                console.log(`Started fusion of pokemon #${i}`);

                const allPokeData = mongoClient.db("pokeDataBase").collection("pokeData").aggregate<customData>([
                    { $sample: { size: 2 } }
                ])

                let pokeFusionArray: customData[] = [];

                await allPokeData.forEach((pokemon) => {
                    pokeFusionArray.push(pokemon)
                }).then(() => {

                    const tmpPokemon: customData = {
                        name: `${pokeFusionArray[0].name.slice(0, 3)}-${pokeFusionArray[1].name.slice(0, 3)}`,
                        img: `${pokeFusionArray[Math.round(Math.random())].img}`,
                        hp: Math.floor((pokeFusionArray[0].hp + pokeFusionArray[1].hp) / 2),
                        exp: Math.floor((pokeFusionArray[0].exp + pokeFusionArray[1].exp) / 2),
                        height: Math.floor((pokeFusionArray[0].height + pokeFusionArray[1].height) / 2),
                        weight: Math.floor((pokeFusionArray[0].weight + pokeFusionArray[1].weight) / 2),
                        types: pokeFusionArray[Math.round(Math.random())].types,
                        abilities: pokeFusionArray[Math.round(Math.random())].abilities,
                    }
                    // Sends generated pokemon data to postgres DB
                    insertPokemon(tmpPokemon, i);

                })


            }
        })

    } catch (error) {
        console.log(error);
    } finally {
        await mongoClient.close();
    }
}


// Inserts the pokemon data to our postgres DB
function insertPokemon(pokemonData: customData, id: number) {

    let insertQuery =
        `INSERT INTO pokemon(
                id, pokedata
                ) VALUES (
                    '${id}','${JSON.stringify(pokemonData)}' 
                )
            `

    pgClient.query(insertQuery, (err, res) => {
        if (err) {
            console.log(err);
            console.log("index of error is " + id + "\n");
        }
        else console.log(`Insert #${id} OK`);
    })

}


