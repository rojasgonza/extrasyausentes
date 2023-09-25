const Sequelize = require('sequelize')
const db = require('../config/config')

const Puesto = db.define('puestos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING
    }
}, { timestamps: false })
module.exports = Puesto