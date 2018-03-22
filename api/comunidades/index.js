const Sequelize = require('sequelize')

const sequelize = new Sequelize('laravel', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false
  }
})

const Comunidades = sequelize.define('comunidades', {
  nome: {
    type: Sequelize.STRING
  },
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  }
})

module.exports = Comunidades
