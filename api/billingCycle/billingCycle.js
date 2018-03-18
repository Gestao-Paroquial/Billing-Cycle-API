const restful = require("node-restful");
const mongoose = restful.mongoose;

const creditSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, min: 0, required: true }
});

const debtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: {
    type: Number,
    min: 0,
    required: [true, "Informe o valor do débito!"]
  },
  status: {
    type: String,
    required: false,
    uppercase: true,
    enum: ["PAGO", "PENDENTE", "AGENDADO"]
  }
});

const billingCycleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, require: true },
  comunidade_id: { type: Number, require: true },
  credits: [creditSchema],
  debts: [debtSchema]
});

module.exports = restful.model("BillingCycle", billingCycleSchema);
