function createUser(obj, args, context) {
  return context.prisma.createUser({
    password: args.password,
    firstName: args.firstName,
    lastName: args.lastName,
    favoriteColor: args.favoriteColor
  })
}

function deleteUser(obj, args, context) {
  return context.prisma.deleteUser({
    id: args.id
  })
}

function modifyUser(obj, args, context) {
  return context.prisma.updateUser({
    data: {
      firstName: args.firstName,
      lastName: args.lastName,
      favoriteColor: args.favoriteColor
    },
    where: {
      id: args.id
    }
  })
}

module.exports = { createUser, deleteUser, modifyUser }