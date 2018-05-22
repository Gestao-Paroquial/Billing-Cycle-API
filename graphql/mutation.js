const { billingCycleMutations } = require('./resources/billingCycle/billingCycle.schema')

const mutation = `
 type Mutation {
  ${billingCycleMutations}
 }
`

module.exports = { mutation }
