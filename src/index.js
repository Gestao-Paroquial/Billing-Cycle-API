require('dotenv').config()
const setup = require('./config/setup')
const server = require('./config/app')
require('./config/database')
require('./config/routes')(server)

setup()
