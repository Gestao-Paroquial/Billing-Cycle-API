const { makeExecutableSchema } = require('graphql-tools')
const { query } = require('./query')
const { mutation } = require('./mutation')
const { billingCycleTypes, debtTypes, creditTypes } = require('./resources/billingCycle/billingCycle.schema')

const { queryResolvers } = require('./resources/billingCycle/billingCycle.resolvers')

const schemaDefinition = `
  type Schema {
    query: Query
    mutation: Mutation
  }
`

const resolvers = {
  Query: {
    ...queryResolvers
  }

}

module.exports = makeExecutableSchema({
  typeDefs: [
    schemaDefinition,
    query,
    mutation,
    debtTypes,
    creditTypes,
    billingCycleTypes
  ],
  resolvers
})
