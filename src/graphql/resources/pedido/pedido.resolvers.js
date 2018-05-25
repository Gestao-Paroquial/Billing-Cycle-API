const Pedido = require('./../../../models/pedido')


const pedidoQueryResolvers = {
  pedidos: () => Pedido.find({}),
}


module.exports = {
  pedidoQueryResolvers,
}
