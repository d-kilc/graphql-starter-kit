function allUsers(obj, args, context, info) {
  return context.prisma.users()
}

function user(obj, args, context, info) {
  return context.prisma.user({
    id: args.id
  })
}

module.exports = {
  allUsers, user
}