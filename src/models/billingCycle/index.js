const mongoose = require('mongoose')

const creditSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, min: 0, required: true },
  donationId: {
    type: String,
  },
})

const debtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: {
    type: Number,
    min: 0,
    required: [true, 'Informe o valor do débito!'],
  },
  status: {
    type: String,
    required: false,
    uppercase: true,
    enum: ['PAGO', 'PENDENTE', 'AGENDADO'],
  },
})

const billingCycleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  comunidade_id: { type: Number, require: true },
  donationGroup: { type: String },
  credits: [creditSchema],
  debts: [debtSchema],
})

module.exports = mongoose.model('BillingCycle', billingCycleSchema)
