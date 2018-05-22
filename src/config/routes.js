const fetch = require('node-fetch')
const express = require('express')

module.exports = (app) => {
  // API Routes
  const router = express.Router()
  app.use('/api', router)

  router.route('/facebook').get((req, res) => {
    fetch(`https://graph.facebook.com/v2.12/829673350416518?fields=fan_count&access_token=${process.env.FB_PAGE_TOKEN}`)
      .then(response => response.json())
      .then(json => res.json(json))
  })
}
