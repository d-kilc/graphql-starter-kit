const { GraphQLServer } = require('graphql-yoga')
// const { prisma } = require('./generated/prisma-client')

// Dummy data (no persistence)
let users = [{
  id: 'user-1',
  firstName: 'Martin',
  lastName: 'Shkreli',
  favoriteColor: 'blue'
},
{
  id: 'user-2',
  firstName: 'Elizabeth',
  lastName: 'Holmes',
  favoriteColor: 'orange'
},
{
  id: 'user-3',
  firstName: 'Adam',
  lastName: 'Neumann',
  favoriteColor: 'red'
}]

let idCount = users.length + 1

// Write your resolvers here (replace boilerplate with your own resolvers):
const resolvers = {
  Query: {
    description: () => `Write your query resolvers here`,
    allUsers: () => users,
    user: (parent, args) => users.find(user => user.id === args.id)
  },
  Mutation: {
    createUser: (parent, args) => {
      let user = {
        id: `user-${idCount++}`,
        firstName: args.firstName,
        lastName: args.lastName,
        favoriteColor: args.favoriteColor
      }
      users.push(user)
      return user
    },
    deleteUser: (parent, args) => {
      let deletedUser = users.find(user => user.id === args.id)
      users.splice(users.indexOf(deletedUser), 1)
      return deletedUser
    },
    modifyUser: (parent, args) => {
      let user = users.find(user => user.id === args.id)
      user.firstName = (args.firstName == null) ? user.firstName : args.firstName
      user.lastName = (args.lastName == null) ? user.lastName : args.lastName
      user.favoriteColor = (args.favoriteColor == null) ? user.favoriteColor : args.favoriteColor
      return user
    },
  },
  User: {
    id: (parent) => parent.id,
    firstName: (parent) => parent.firstName,
    lastName: (parent) => parent.lastName,
    favoriteColor: (parent) => parent.favoriteColor,
  }
}

// Initialize the server and run it locally:
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  // context: { prisma },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))