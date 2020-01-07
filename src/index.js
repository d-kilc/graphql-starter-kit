const { GraphQLServer } = require('graphql-yoga')

// Write your resolvers here (replace boilerplate with your own resolvers):
const resolvers = {
  Query: {
    info: () => `Test`,
    // feed: (root, args, context, info) => {
    //   return context.prisma.links()
    // },
  },
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
  // context: { prisma },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))