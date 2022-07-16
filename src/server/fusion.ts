import { customData } from "./pokeData";
import { MongoClient } from 'mongodb'
import { uri } from './key'

const client = new MongoClient(uri)

async function main() {
    try {

        await client.connect()

        for (let i = 0; i < 60000; i++) {
            
            const allPokeData = client.db("pokeDataBase").collection("pokeData").aggregate<customData>([
                {
                    $sample: { size: 2 }
                }
            ])
            
            let pokeFusionArray: customData[] = [];
            
            await allPokeData.forEach((pokemon) => {
                pokeFusionArray.push(pokemon)
            })
            
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
            
            await insertDoc(client, tmpPokemon)
        }

    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
}

async function insertDoc(client: MongoClient, tmpPokemon: customData) {
    await client.db("pokeDataBase").collection("pokeData").insertOne(tmpPokemon)
}

main()