const _ = require('lodash')

function parseErrors(nodeRestfulErrors) {
  const errors = []
  _.forIn(nodeRestfulErrors, error => errors.push(error.message))
  return errors
}

function sendErrorsOrNext(req, res, next) {
  const { bundle } = res.locals
  if (bundle.errors) {
    const errors = parseErrors(bundle.errors)
    res.status(500).json({ errors })
  } else {
    next()
  }
}

const sumDebtsOrCredits = (arr = []) => arr.reduce((prev, curr) => prev + curr.value, 0)


module.exports = {
  parseErrors,
  sendErrorsOrNext,
  sumDebtsOrCredits,
}

