# pokedex-Lior-Tal

# TODO:

* Define UI and page construction: Do we want a front page that leads to the specific pokemon, that holds a list of all pokémons? Do we want the current page but with a "choosing" mechanism that lets the user choose from a list?

* Search - error "unfound" scenario (ui-wise)



# Lior:

## Landing hero page:
* Front page + design (Figma)
* Pokemon page + design (Figma)

# Tal:

## Search:
* Autofill - still TODO
## Etc.
* Randomize 3 pokemon - only img, name and types
### Changes I made:
* app.ts magic is present in localhost:4000/pokemon.html

* Pokemon object now stores only selected data instead of all the API's data (localStorage was overloaded and it's not recommended for loading times)

* Added localStorage to avoid multiple API GET requests

* Different approach for "first time load" and "already loaded before" scenarios depending on localStorage key existence

* Pokemon object function renderAtParent(parent) allows us to render the Pokemon object inside given parent parameter, without applying it to the object's this.parent property

* app.ts - reconfigured use of async functions. Variables are present only in window.load event listener @ end of code



