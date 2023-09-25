const Sequelize = require('sequelize')
const db = require('../config/config')

const Dia = db.define('dias', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING
    }
}, {timestamps:false})
module.exports = Dia;