import { graphql } from 'graphql'
import schema from '../../../src/graphql/schema'
import BillingCycle from '../../../src/models/billingCycle'
import { sumDebtsOrCredits } from './../../../src/utils'
import setupTest from '../../helper'

describe('billingCycle', () => {
  const billingCycleModel = {
    name: 'teste',
    date: Date.now(),
    comunidade_id: 1,
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

  const arrOfBillingCycles = [billingCycleModel, billingCycleModel]

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
    await BillingCycle.insertMany(arrOfBillingCycles)
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
        expect(billingCycles.length).toBe(arrOfBillingCycles.length)
      })
      it('should return paginated billingCycles', async () => {
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
      it('should return the correct billingCycle', async () => {
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
    describe('findByComunidadeId', () => {
      it('should return only billingCycles with comunidade_id equal 1', async () => {
        const { data: { findByComunidadeId } } = await graphql(schema, `
        {
          findByComunidadeId(comunidade_id: 1) {
              comunidade_id
          }
        }
      `)

        const { length } = findByComunidadeId.filter(({ comunidade_id }) => comunidade_id === 1)
        expect(length).toBe(findByComunidadeId.length)
      })
    })
    describe('count', () => {
      it('should return the number of billingCycles', async () => {
        const { data: { count } } = await graphql(schema, `
        {
          count
        }
      `)

        expect(count).toBe(arrOfBillingCycles.length)
      })
    })
    describe('summary', () => {
      it('should return the sum of all credits and debts', async () => {
        const { data: { summary: { credit, debt } } } = await graphql(schema, `
        {
          summary{
            credit
            debt
          }
        }
        `)

        const { length } = arrOfBillingCycles
        expect(credit).toBe(sumDebtsOrCredits(billingCycleModel.credits) * length)
        expect(debt).toBe(sumDebtsOrCredits(billingCycleModel.debts) * length)
      })
    })
    describe('annualTurnover', () => {
      it('should return 12 months', async () => {
        const { data: { annualTurnover } } = await graphql(schema, `
        {
          annualTurnover {
            month
            summary {
              credit
              debt
            }
          }
        }
        `)

        expect(annualTurnover.length).toBe(12)
      })
    })
  })
})
