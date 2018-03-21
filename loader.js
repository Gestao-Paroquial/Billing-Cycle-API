require('dotenv').config()

const server = require('./config/app')
require('./config/database')
require('./config/routes')(server)
