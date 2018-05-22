const { billingCycleQueries } = require('./resources/billingCycle/billingCycle.schema')

const query = `
 type Query {
  ${billingCycleQueries}
 }
`

module.exports = { query }
