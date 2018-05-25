const { billingCycleMutations } = require('./resources/billingCycle/billingCycle.schema')

const { pedidoMutations } = require('./resources/pedido/pedido.schema')

const mutation = `
 type Mutation {
  ${billingCycleMutations}
  ${pedidoMutations}
 }
`

module.exports = { mutation }
