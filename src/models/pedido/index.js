const mongoose = require('mongoose')

const pedidoSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  value: { type: Number, required: true },
})

module.exports = mongoose.model('Pedido', pedidoSchema)
