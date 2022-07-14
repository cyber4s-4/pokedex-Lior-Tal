# Pokedex-3 Task - 1M Pokémons!

We want to build a huge pokédex, with space for over 1 million Pokémons!

After all, Gotta Catch 'Em All..

In this task you will add a MongoDB database to your pokédex and deploy it to the cloud.

## Instructions

* Write a script that takes your `data.json` file with your Pokémons and adds them to the database.
* Recently, Japanese scientists have discovered that it's possible to do Pokémon fusion (see [here](https://japeal.com/pkm/)). Write a script that randomly takes 2 Pokémons from the database (or your `data.json` - whichever more convenient) and creates a new one. Do this until you reach 1M Pokémons!
* Review your pokédex and see if it scales to 1M Pokémons. It should load quickly (ideally less than 1 second, but not more than 2 seconds). Make adjustments to make this happen.


## Bonus
* You can do the bonus from the last project - if you've not done it yet.

* Deploy your pokédex to Heroku, and make it use MongoDB Atlas. If you recall, you set the IP to your local machine, so you will probably have to allow Heroku access to.