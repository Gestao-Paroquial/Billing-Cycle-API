
const creditTypes = `
 type Credit {
  name: String!
  value: Float!
 }

 input CreditInput {
  name: String!
  value: Float!
 }
`

const debtTypes = `
 type Debt {
  name: String!
  value: Float!
 }

 input DebtInput {
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

  type Summary {
    credit: Float!
    debt: Float!
  }

  input BillingCycleInput {
    name: String!
    date: String!
    comunidade_id: Int
    debts: [DebtInput]
    credits: [CreditInput]
  }
`

const billingCycleQueries = `
  billingCycles(first: Int, offset: Int): [BillingCycle!]!
  billingCycle(id: ID!): BillingCycle!
  findByComunidadeId(comunidade_id: Int!): [BillingCycle!]!
  count: Int!
  getSummary: Summary!
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
