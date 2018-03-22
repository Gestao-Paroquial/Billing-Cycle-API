const express = require('express')
const billingCycleService = require('../api/billingCycle/billingCycleService')
const billingSummaryService = require('../api/billingSummary/billingSummaryService')

module.exports = (app) => {
  // API Routes
  const router = express.Router()
  app.use('/api', router)

  // rotas da API
  billingCycleService.register(router, '/billingCycles')

  router.route('/billingSummary').get(billingSummaryService.getSummary)
}
