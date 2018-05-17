const BillingCycle = require('../../../api/billingCycle/billingCycle')

const queryResolvers = {
  billingCycle: (parent, { id }) => BillingCycle.findById(id),
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
  count: (parent, params) => BillingCycle.count(),
  getSummary: async () => {
    const summary = await BillingCycle.aggregate([
      {
        $project: { credit: { $sum: '$credits.value' }, debt: { $sum: '$debts.value' } }
      },
      {
        $group: { _id: null, credit: { $sum: '$credit' }, debt: { $sum: '$debt' } }
      },
      {
        $project: { _id: 0, credit: 1, debt: 1 }
      }
    ])

    return summary.shift()
  }
}

const mutationsResolver = {
  createBillingCycle: (parent, { input }) => BillingCycle.create(input),
  updateBillingCycle: (parent, { id, input }) => BillingCycle.findOneAndUpdate({ _id: id }, input),
  deleteBillingCycle: async (parent, { id }) => {
    const billingCycle = await BillingCycle.findByIdAndRemove({ _id: id })

    return !!billingCycle
  }
}

module.exports = {
  queryResolvers,
  mutationsResolver
}
