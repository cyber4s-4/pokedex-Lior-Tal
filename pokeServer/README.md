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

3. `npm run tsc` (compiles typescript)

4. `npm run json` (creates data json)

5. `npm run json-test`(Test the created file)

6. Look at the log output:

```console
JSON file created successfully
```

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