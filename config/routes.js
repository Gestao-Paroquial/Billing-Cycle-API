const express = require('express')
const billingCycleService = require('../api/billingCycle/billingCycleService')
const billingSummaryService = require('../api/billingSummary/billingSummaryService')
const Comunidades = require('./../api/comunidades')

module.exports = (app) => {
  // API Routes
  const router = express.Router()
  app.use('/api', router)

  // rotas da API
  billingCycleService.register(router, '/billingCycles')

  router.route('/billingSummary').get(billingSummaryService.getSummary)

  router.route('/comunidades').get((req, res, next) => {
    Comunidades.findAll().then((comunidades) => {
      res.json({ comunidades })
    })
  })
}
