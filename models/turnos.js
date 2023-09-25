const Sequelize = require('sequelize')
const db = require('../config/config')

const Turno = db.define('turnos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING
    }
}, { timestamps: false })

module.exports = Turno