# GraphQL

## schema.graphql
This is where you will define your desired schema. Each field in the schema must have a corresponding resolver (defined in /src/resolvers/).

'Query' and 'Mutation' are called root types. If a root field returns a user-defined type (e.g., 'user()' must return an object of type User), then the flow is as follows:
* resolver for the root field is executed ('user(id: ID!): User')
* an object of type User is returned
* resolvers for the fields on the User object are executed

<img src="assets/resolver_execution_flow.png"/>

As an important note, the end results of a GraphQL query must be scalar types. In the example above, the user() query does not return the object because it is a User type, so the next level-down of resolvers are executed and return scalar types (ID, string). 

## Resolvers
Resolvers define how your queries will be executed. Think of these as basic function definitions which contain the logic of what should happen when the queries are performed. Again, each field in your schema must have a resolver so GraphQL can know what to do when you query on them.

Every resolver receives 4 arguments (in this order):
* **root / parent**--contains the result of the parent field's resolver
* **args**--the arguments passed to the field in the query you wrote
* **context**--shared by all resolvers in the query. Allows resolvers to communicate
* **info**--contains information about the execution state of the query, including the field name, path to the field from the root

As you build out your schema, remember to create resolvers for the things you have added. If you are using Prisma to read/write to a database, take advantage of the functions in the Prisma client library in your resolvers. You can access these functions by importing the library and accessing it from the **context object** (e.g., "context.prisma.createUser()"). More information about Prisma is below.

Refer to the examples in src/resolvers/ as a starting point.

# Prisma
Prisma is used to connect GraphQL to a persistent data store.

To set up Prisma locally, follow the steps below.

1. Run the following commands:
```
npm add prisma -g
prisma deploy --new
```

2. Select Demo server + MySQL database and follow the prompts in the terminal. You may have to create an Prisma account. Once this has finished, note that your endpoint has been created and referenced in prisma.yml. 


3. Generate the Prisma client with the command below. This will create the library that will allow you to read / write using Prisma.
```
prisma generate
``` 

5. Any time a change is made to your Prisma datamodel, you must re-run
```
prisma deploy
```
This will re-generate your client library as well, so all the changes you made to the datamodel are reflected.

6. Now, you can use the Prisma client by including the following line at the top of your files. 
```
const { prisma } = require('./generated/prisma-client')
``` 
To use the client, you will access the imported Prisma object from the context object and call your functions like so:
```
context.prisma.createUser({firstName: "Brad", lastName: "Pitt"})
context.prisma.users()
```
## datamodel.prisma
Files ending in .prisma use GraphQL schema definition language (SDL) so this will look very similar to your schema.graphql file. In general, these files should match. A note: the '@id' directive in datamodel.prisma tells Prisma to autogenerate a GUID for records of type Link. Similarly, '@createdAt' tells Prisma to autogenerate a timestamp for the 'createdAt' field.

## prisma.yml
This file points Prisma to the HTTP endpoint for your API, the Prisma datamodel, and specifies which language the client should be generated in and where it should be located (https://www.howtographql.com/graphql-js/4-adding-a-database/). When the prisma deploy command is executed, your endpoint will automatically populate.

## Sources
* https://www.howtographql.com/
* https://www.prisma.io/docs/1.34/get-started/01-setting-up-prisma-new-database-JAVASCRIPT-a002/
* https://www.prisma.io/docs/prisma-client/basic-data-access/writing-data-JAVASCRIPT-rsc6/