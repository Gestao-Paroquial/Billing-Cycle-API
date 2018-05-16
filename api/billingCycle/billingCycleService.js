const BillingCycle = require('./billingCycle')
const { sendErrorsOrNext } = require('../../utils')

BillingCycle.methods(['get', 'post', 'put', 'delete'])
BillingCycle.updateOptions({ new: true, runValidators: true })

BillingCycle.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

module.exports = BillingCycle
