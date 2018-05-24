
const creditTypes = `
 type Credit {
  name: String!
  value: Float!
  donationId: ID
 }

 input CreditInput {
  name: String!
  value: Float!
  donationId: ID
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
    donationGroup: String
  }

  type Summary {
    credit: Float!
    debt: Float!
  }

  type AnnualTurnover {
    month: String!
    summary: Summary!
  }

  input BillingCycleInput {
    name: String!
    date: String!
    comunidade_id: Int
    debts: [DebtInput]
    credits: [CreditInput]
    donationGroup: String
  }

  input BillingCycleUpdate {
    name: String
    date: String
    comunidade_id: Int
    debts: [DebtInput]
    credits: [CreditInput]
    donationGroup: String
  }
`

const billingCycleQueries = `
  billingCycles(first: Int, offset: Int): [BillingCycle!]!
  billingCycle(id: ID!): BillingCycle!
  findByComunidadeId(comunidade_id: Int!): [BillingCycle!]!
  count: Int!
  summary: Summary!
  annualTurnover: [AnnualTurnover]!
`

const billingCycleMutations = `
  createBillingCycle(input: BillingCycleInput!): BillingCycle
  updateBillingCycle(id: ID!, input: BillingCycleUpdate!): BillingCycle
  deleteBillingCycle(id: ID!): Boolean
  addToDonationGroup(donationGroup: String!, credit: CreditInput!): BillingCycle
`

module.exports = {
  billingCycleTypes,
  billingCycleQueries,
  billingCycleMutations,
  debtTypes,
  creditTypes,
}
