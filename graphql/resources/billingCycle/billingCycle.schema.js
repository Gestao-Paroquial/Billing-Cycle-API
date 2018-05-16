
const creditTypes = `
 type Credit {
  name: String!
  value: Float!
 }
`

const debtTypes = `
 type Debt {
  name: String!
  value: Float!
 }
`

const billingCycleTypes = `
  type BillingCycle {
    id: ID!
    name: String!
    date: String!
    comunidade_id: Int,
    debts: [Debt]!
    credits: [Credit]!
  }

  input BillingCycleInput {
    billingCycle: String!
    user: Int!
    post: Int!
  }
`

const billingCycleQueries = `
  billingCycles(first: Int, offset: Int): [BillingCycle!]!
  findByComunidadeId(comunidade_id: Int!): [BillingCycle!]!
  count: Int!
`

const billingCycleMutations = `
  createBillingCycle(input: BillingCycleInput!): BillingCycle
  updateBillingCycle(id: ID!, input: BillingCycleInput): BillingCycle
  deleteBillingCycle(id: ID!): Boolean
`

module.exports = {
  billingCycleTypes,
  billingCycleQueries,
  billingCycleMutations,
  debtTypes,
  creditTypes
}
