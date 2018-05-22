const { makeExecutableSchema } = require('graphql-tools')
const { query } = require('./query')
const { mutation } = require('./mutation')
const { billingCycleTypes, debtTypes, creditTypes } = require('./resources/billingCycle/billingCycle.schema')

const { queryResolvers, mutationsResolver } = require('./resources/billingCycle/billingCycle.resolvers')

const schemaDefinition = `
  type Schema {
    query: Query
    mutation: Mutation
  }
`

const resolvers = {
  Query: {
    ...queryResolvers,
  },
  Mutation: {
    ...mutationsResolver,
  },

}

module.exports = makeExecutableSchema({
  typeDefs: [
    schemaDefinition,
    query,
    mutation,
    debtTypes,
    creditTypes,
    billingCycleTypes,
  ],
  resolvers,
})
