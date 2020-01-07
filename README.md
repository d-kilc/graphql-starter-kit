# GraphQL

## schema.graphql


# Prisma
Prisma is used to connect GraphQL to a persistent data store.

To set up Prisma locally, follow the steps below.

1. Run the following commands
```
yarn global add prisma
prisma deploy
```

2. Generate the Prisma client with 
```
prisma generate
``` 

3. Make sure Docker is installed on your machine. Modify docker-compose.yml according to the needs of your connection.

4. Launch Prisma and the connected database
```
docker-compose up -d
```

Now, you can use the Prisma client by including the following line at the top of your files:
```
const { prisma } = require('./generated/prisma-client')
```

## datamodel.prisma
Files ending in .prisma use GraphQL schema definition language (SDL) so this will look very similar to your schema.graphql file. The '@id' directive in datamodel.prisma tells Prisma to autogenerate a GUID for records of type Link. Similarly, '@createdAt' tells Prisma to autogenerate a timestamp for the 'createdAt' field.

## prisma.yml
This file points Prisma to the HTTP endpoint for your API, the Prisma datamodel, and specifies which language the client should be generated in and where it should be located (https://www.howtographql.com/graphql-js/4-adding-a-database/).




## Sources
* https://www.howtographql.com/
* https://www.prisma.io/docs/1.34/get-started/01-setting-up-prisma-new-database-JAVASCRIPT-a002/