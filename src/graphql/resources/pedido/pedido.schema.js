const pedidoTypes = `
  type Pedido {
    id: ID!
    name: String!
    value: Float!
  }
`

const pedidoQueries = `
  pedidos: [Pedido!]!
  pedido(name: String!): Pedido!
`

const pedidoMutations = `
  changeValue(name: String!, value: Float!): Pedido!
`

module.exports = {
  pedidoTypes,
  pedidoQueries,
  pedidoMutations,
}
