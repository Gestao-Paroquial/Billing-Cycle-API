const pedidoTypes = `
  type Pedido {
    id: ID!
    name: String!
    value: Float!
  }
`

const pedidoQueries = `
  pedidos: [Pedido!]!
  pedido(id: ID, name: String): Pedido!
`

module.exports = {
  pedidoTypes,
  pedidoQueries,
}
