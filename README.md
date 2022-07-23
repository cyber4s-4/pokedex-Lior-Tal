# PokéDex - V4
Generates a UI based on data fetched from Postgres API</br>
The project is deployed to heroku:</br>
[Link](https://lior-tal-pokedex.herokuapp.com/)

### How to execute?

```console
npm ci

npm start 
```

### Generating a database
1. Enter the postgres url inside ./src/server/fusion-postgres.ts
```js
const DATABASE_URL = /* Enter postgreSQL URL */
```

2. Execute npm script
```console
npm run fusion-pg
```

### How to deploy?

Instructions are in `how-to-deploy.md`
