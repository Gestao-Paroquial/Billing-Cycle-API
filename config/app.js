const port = 3003

const bodyParser = require('body-parser')
const express = require('express')

const app = express()
const queryParser = require('express-query-int')
const jwt = require('express-jwt')
const cors = require('cors')
const allowCors = require('./cors')
const schema = require('../graphql/schema')

const graphqlHTTP = require('express-graphql')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(allowCors)
app.use(queryParser())
app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}))

if (process.env.NODE_ENV === 'development') app.use(jwt({ secret: process.env.JWT_SECRET }).unless({ path: ['/token'] }))

app.listen(port, () => {
  console.log(`BACKEND is running on port ${port}.`)
})

module.exports = app
