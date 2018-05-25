const Pedido = require('../models/pedido')

const createNewPedido = name => Pedido.create({
  name,
  value: 100,
})

const createDefaultPedidos = async (name) => {
  const pedido = await Pedido.findOne({
    name,
  })

  if (!pedido) await createNewPedido(name)
}

module.exports = async () => {
  await createDefaultPedidos('batismo')
  await createDefaultPedidos('casamento')
}
