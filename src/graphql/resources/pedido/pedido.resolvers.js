const Pedido = require('./../../../models/pedido')


const pedidoQueryResolvers = {
  pedidos: () => Pedido.find({}),
  pedido: (parent, {
    name,
  }) => Pedido.findOne({
    name,
  }),
}

const pedidoMutationsResolvers = {
  changeValue: (parent, {
    name,
    value,
  }) => Pedido.findOneAndUpdate({
    name,
  }, {
    value,
  }, {
    new: true,
  }),
}


module.exports = {
  pedidoQueryResolvers,
  pedidoMutationsResolvers,
}
