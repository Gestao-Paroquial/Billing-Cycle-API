const _ = require('lodash')
const BillingCycle = require('../billingCycle/billingCycle')

const moment = require('moment')
require('moment/locale/pt-br')

moment.locale('pt-BR')

// Mais uma função middleware
function getSummary (req, res) {
  BillingCycle.aggregate({
    $project: { credit: { $sum: '$credits.value' }, debt: { $sum: '$debts.value' } }
  }, {
    $group: { _id: null, credit: { $sum: '$credit' }, debt: { $sum: '$debt' } }
  }, {
    $project: { _id: 0, credit: 1, debt: 1 }
  }, (error, result) => {
    if (error) {
      res.status(500).json({ errors: [error] })
    } else {
      res.json(_.defaults(result[0], { credit: 0, debt: 0 }))
    }
  })
}

function annualTurnover (req, res) {
  const expireDate = new Date()
  expireDate.setFullYear(expireDate.getFullYear() - 1)
  expireDate.setDate(expireDate.getDate() - 1)

  BillingCycle.find({
    date: {
      $gt: expireDate
    }
  }, (error, billingCycles) => {
    if (error) {
      res.status(500).json({ errors: [error] })
    }

    const monthTurnover = moment.months().reduce((prev, curr) => {
      prev[curr] = {
        entradas: 0,
        saidas: 0
      }
      return prev
    }, {})

    billingCycles.forEach((billingCycle) => {
      const sumOfDebts = sumDebtsOrCredits(billingCycle.debts)
      const sumOfCredits = sumDebtsOrCredits(billingCycle.credits)

      const month = moment(billingCycle.date).add(1, 'days').startOf('month').format('MMMM')

      monthTurnover[month].entradas += sumOfCredits
      monthTurnover[month].saidas += sumOfDebts
    })

    res.json(monthTurnover)
  })
}

const sumDebtsOrCredits = (arr = []) => arr.reduce((prev, curr) => prev + curr.value, 0)

module.exports = { getSummary, annualTurnover }
