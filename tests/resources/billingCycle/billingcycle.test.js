import { graphql } from 'graphql'
import schema from '../../../src/graphql/schema'
import BillingCycle from '../../../src/models/billingCycle'
import setupTest from '../../helper'

describe('billingCycle', () => {
  const billingCycleModel = {
    name: 'teste',
    date: Date.now(),
    credits: [],
    debts: [],
  }
  beforeEach(async () => {
    await setupTest()

    await BillingCycle.insertMany([billingCycleModel, billingCycleModel])
  })
  it('should be null when user is not logged in', async () => {
    // language=GraphQL
    const query = `
    {
      billingCycles {
        id
      }
    }
  `

    const { data: { billingCycles } } = await graphql(schema, query)

    expect(billingCycles).toBeInstanceOf(Array)
    expect(billingCycles.length).toBe(2)
  })
})
