const BillingCycle = require('./../../../models/billingCycle')

const moment = require('moment')
require('moment/locale/pt-br')

moment.locale('pt-BR')

const sumDebtsOrCredits = (arr = []) => arr.reduce((prev, curr) => prev + curr.value, 0)

const createNewDonationGroup = (donationGroup = '', credit = {}) =>
  BillingCycle.create({
    donationGroup,
    name: `Doações de ${moment().format('MMMM')} de ${moment().format('YYYY')}`,
    credits: [credit],
    date: Date.now(),
  })


const queryResolvers = {
  billingCycle: (parent, { id }) => BillingCycle.findById(id),
  billingCycles: (parent, {
    first = 0,
    offset = 10,
  }) => BillingCycle
    .find({})
    .skip(first)
    .limit(offset),
  findByComunidadeId: (parent, {
    comunidade_id,
  }) =>
    BillingCycle.find({
      comunidade_id,
    }),
  count: () => BillingCycle.count(),
  summary: async () => {
    const summary = await BillingCycle.aggregate([
      {
        $project: { credit: { $sum: '$credits.value' }, debt: { $sum: '$debts.value' } },
      },
      {
        $group: { _id: null, credit: { $sum: '$credit' }, debt: { $sum: '$debt' } },
      },
      {
        $project: { _id: 0, credit: 1, debt: 1 },
      },
    ])

    return summary.shift()
  },
  annualTurnover: async () => {
    const expireDate = new Date()
    expireDate.setFullYear(expireDate.getFullYear() - 1)
    expireDate.setDate(expireDate.getDate() - 1)

    const billingCycles = await BillingCycle.find({ date: { $gt: expireDate } })

    const annualTurnover = moment.months().reduce((prev, curr) => {
      prev.push({
        month: curr,
        summary: {
          credit: 0,
          debt: 0,
        },
      })

      return prev
    }, [])

    billingCycles.forEach((billingCycle) => {
      const sumOfDebts = sumDebtsOrCredits(billingCycle.debts)
      const sumOfCredits = sumDebtsOrCredits(billingCycle.credits)

      const month = moment(billingCycle.date).add(1, 'days').startOf('month').format('MMMM')

      const monthTurnover = annualTurnover.find(ele => ele.month === month)

      monthTurnover.summary.credit += sumOfCredits
      monthTurnover.summary.debt += sumOfDebts
    })
    return annualTurnover
  },
}

const mutationsResolver = {
  createBillingCycle: (parent, { input }) => BillingCycle.create(input),
  updateBillingCycle: (parent, { id, input }) => BillingCycle.findOneAndUpdate({ _id: id }, input),
  deleteBillingCycle: async (parent, { id }) => {
    const billingCycle = await BillingCycle.findByIdAndRemove({ _id: id })

    return !!billingCycle
  },
  addToDonationGroup: async (parent, { donationGroup, credit }) => {
    const billingCycle = await BillingCycle.findOneAndUpdate(
      { donationGroup },
      { $push: { credits: credit } },
    )

    console.log(billingCycle)

    if (!billingCycle) return createNewDonationGroup(donationGroup, credit)

    return billingCycle
  },
}

module.exports = {
  queryResolvers,
  mutationsResolver,
}
