const {
  port = 3003,
  host = '127.0.0.1',
} = process.env

const bodyParser = require('body-parser')
const express = require('express')

const app = express()
const queryParser = require('express-query-int')
const jwt = require('express-jwt')
const cors = require('cors')
const allowCors = require('./cors')
const graphqlHTTP = require('express-graphql')

const schema = require('../graphql/schema')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(allowCors)
app.use(queryParser())
app.use(cors())

if (process.env.NODE_ENV !== 'development') app.use(jwt({ secret: process.env.JWT_SECRET }))

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development',
}))

app.listen(port, host, () => {
  console.log(`BACKEND is running on http://${host}:${port}`)
})

module.exports = app
