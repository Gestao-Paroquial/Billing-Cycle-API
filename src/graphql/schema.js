const { makeExecutableSchema } = require('graphql-tools')
const { query } = require('./query')
const { mutation } = require('./mutation')
const { pedidoTypes } = require('./resources/pedido/pedido.schema')
const { billingCycleTypes, debtTypes, creditTypes } = require('./resources/billingCycle/billingCycle.schema')
const { queryResolvers, mutationsResolver } = require('./resources/billingCycle/billingCycle.resolvers')

const { pedidoQueryResolvers, pedidoMutationsResolvers } = require('./resources/pedido/pedido.resolvers')

const schemaDefinition = `
  type Schema {
    query: Query
    mutation: Mutation
  }
`

const resolvers = {
  Query: {
    ...queryResolvers,
    ...pedidoQueryResolvers,
  },
  Mutation: {
    ...mutationsResolver,
    ...pedidoMutationsResolvers,
  },

}

module.exports = makeExecutableSchema({
  typeDefs: [
    schemaDefinition,
    query,
    mutation,
    pedidoTypes,
    debtTypes,
    creditTypes,
    billingCycleTypes,
  ],
  resolvers,
})
