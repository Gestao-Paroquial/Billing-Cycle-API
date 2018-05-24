import { graphql } from 'graphql'
import schema from '../../../src/graphql/schema'
import BillingCycle from '../../../src/models/billingCycle'
import setupTest from '../../helper'

describe('billingCycle', () => {
  const billingCycleModel = {
    name: 'teste',
    date: Date.now(),
    credits: [{
      name: 'teste',
      value: 50,
      donationId: 1,
    }],
    debts: [{
      name: 'teste',
      value: 50,
    }],
  }
  const fields = `
  id
  name
  date
  debts {
    name
    value 
  }
  credits {
    name
    value
    donationId
  }
  `
  beforeEach(async () => {
    await setupTest()
    await BillingCycle.insertMany([billingCycleModel, billingCycleModel])
  })

  describe('querys', () => {
    describe('billingCycles', () => {
      const query = `
        {
          billingCycles {
              ${fields}
          }
        }
      `
      it('should return two billingCycles', async () => {
        const { data: { billingCycles } } = await graphql(schema, query)
        expect(billingCycles).toBeInstanceOf(Array)
        expect(billingCycles.length).toBe(2)
      })
      it('should return one billingCycle when pass a first and offset', async () => {
        const query2 = `
        {
          billingCycles(first:1, offset: 0) {
              ${fields}
          }
        }
      `
        const { data: { billingCycles } } = await graphql(schema, query2)
        expect(billingCycles).toBeInstanceOf(Array)
        expect(billingCycles.length).toBe(1)
      })
    })
    describe('billingCycle', () => {
      it('should return the the correct billingCycle', async () => {
        const { data: { billingCycles } } = await graphql(schema, `
        {
          billingCycles {
              ${fields}
          }
        }
      `)
        const { id } = billingCycles[0]
        const { data: { billingCycle } } = await graphql(schema, `
        {
          billingCycle(id: "${id}") {
              ${fields}
          }
        }
      `)
        expect(billingCycle.id).toBe(id)
      })
    })
  })
})
