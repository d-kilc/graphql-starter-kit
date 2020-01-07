const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

// Write your resolvers here (replace boilerplate with your own resolvers):
const resolvers = {
  Query: {
    info: () => `Test`,
    feed: (root, args, context, info) => {
      return context.prisma.links()
    },
  },
  // Create a link using Prisma to persist the data in a database. Follow this pattern to write data to a persistent data store
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description,
      })
    },
  },
}

// Initialize the server and run it locally:
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))