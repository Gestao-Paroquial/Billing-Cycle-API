const { billingCycleQueries } = require('./resources/billingCycle/billingCycle.schema')
const { pedidoQueries } = require('./resources/pedido/pedido.schema')

const query = `
 type Query {
  ${pedidoQueries}
  ${billingCycleQueries}
 }
`

module.exports = { query }
