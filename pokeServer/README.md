# PokéServer - Instructions:
In this package we have 2 utilities for executing the pokédex app:</br>
1) Data JSON file - generated once</br>
2) Express server - executed before application

## Pokémon JSON generator:
Generates a PokéData JSON file that holds all of the pokédex information</br>
If it's your first time running the app, you need to generate the JSON</br>
for the app to run normally

### How do I do it?

1. Open terminal on ~/pokeServer

2. `npm ci`

3. `npm run json`

4. Test the created file - `npm run json-test`

5. Look at the log output:

#### Damaged JSON
```console
Error: JSON file damaged
    at ~/pokedex-Lior-Tal/pokeServer/src/check.ts:14:15
```
Go to [troubleshooting](#troubleshooting) section - [Faulty JSON file](#faulty-json-file)
</br> After troubleshooting, return to step 3 until successful

#### Good JSON
```console
JSON file created successfully
```
JSON is OK

### That's it, you can now run the server
</br>

## Pokémon Server:
The Pokémon server opens a new Express app that runs on port 3000</br>
This server will give the app the JSON Pokémon data that it needs</br>
to run accordingly (The same JSON you generated as described above)

### How do I do it?

* Open terminal on ~/pokeServer

* Make sure you have the node_modules installed
</br>(If not: run `npm ci`)

* Make sure the PokeData.json file exists
</br>(If not: Generate one as described above)

* Compile the TypeScript code:
</br> `npm run tsc`

* Start the PokéServer:
</br> `npm start`

## What's next?
Go over to ~/pokeDex and execute it with npm.

</br>

## Troubleshooting

### Faulty JSON file:

* If test-json logs to the console a number that's smaller than 151
</br> it means that the Pokémon data didn't load fully from the API
</br> Possible reasons: Slow internet speed (most probably), server error, etc.

* Go to app.ts

* Lines 12-13 for reference: 
```js
// ! Change this variable if you've come here from troubleshooting
const LOADING_TIME = 2000; // 2000ms = 2 seconds
// Change this value ^^^ to a higher one
```

* Change the value as described, if you're on slow Wi-Fi we recommend <b>10000ms</b>

* Go back to [JSON generator step 3](#pokémon-json-generator) (recreate the JSON and test it)