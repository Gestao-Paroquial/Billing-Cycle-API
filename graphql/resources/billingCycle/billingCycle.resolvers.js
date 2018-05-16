const BillingCycle = require('../../../api/billingCycle/billingCycle')

const queryResolvers = {
  billingCycles: (parent, {
    first = 0,
    offset = 10
  }) => BillingCycle
    .find({})
    .skip(first)
    .limit(offset),
  findByComunidadeId: (parent, {
    comunidade_id
  }) =>
    BillingCycle.find({
      comunidade_id
    }),
  count: (parent, params) => BillingCycle.count()
}

// const mutationsResolver = {
//   createBillingCycle: (parent, { input }) => {
//     // console.log(input)
//   }
// }

module.exports = {
  queryResolvers
}
