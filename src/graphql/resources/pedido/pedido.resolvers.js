const Pedido = require('./../../../models/pedido')


const pedidoQueryResolvers = {
  pedidos: () => Pedido.find({}),
  pedido: (parent, { name }) => Pedido.findOne({ name }),
}


module.exports = {
  pedidoQueryResolvers,
}
