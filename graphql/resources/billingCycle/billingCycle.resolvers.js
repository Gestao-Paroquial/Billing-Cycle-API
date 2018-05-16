
const BillingCycle = require('../../../api/billingCycle/billingCycle')

const queryResolvers = {
  billingCycles: (_, { first = 0, offset = 10 }) => new Promise((resolve, reject) => {
    BillingCycle.find({}, (error, result) => {
      error ? reject(error) : resolve(result)
    }).skip(first).limit(offset)
  }),
  findByComunidadeId: (_, { comunidade_id }) => new Promise((resolve, reject) => {
    BillingCycle.find({ comunidade_id }, (error, result) => {
      error ? reject(error) : resolve(result)
    })
  }),
  count: (_, params) => new Promise((resolve, reject) => {
    BillingCycle.count((error, value) => {
      error ? reject(error) : resolve(value)
    })
  })
}

module.exports = {
  queryResolvers
}
