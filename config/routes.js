const fetch = require('node-fetch')
const express = require('express')
// const billingCycleService = require('../api/billingCycle/billingCycleService')
const billingSummaryService = require('../api/billingSummary/billingSummaryService')

module.exports = (app) => {
  // API Routes
  const router = express.Router()
  app.use('/api', router)

  // rotas da API
  // billingCycleService.register(router, '/billingCycles')

  router.route('/billingSummary').get(billingSummaryService.getSummary)

  router.route('/movimentacaoAnual').get(billingSummaryService.annualTurnover)

  router.route('/facebook').get((req, res, next) => {
    fetch(`https://graph.facebook.com/v2.12/829673350416518?fields=fan_count&access_token=${process.env.FB_PAGE_TOKEN}`)
      .then(response => response.json())
      .then(json => res.json(json))
  })
}
