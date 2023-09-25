const Sequelize = require('sequelize')
const db = require('../config/config')
const Empleado = require('./empleado')
const Turno = require('./turnos')
const Puesto = require('./puesto')
const Dia = require('./dias')
const Local = require('./local')

const Extra = db.define('extras', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    monto: {
        type: Sequelize.DECIMAL(10, 2)
    },
    fecha: {
        type: Sequelize.DATEONLY
    },
    estado: {
        type: Sequelize.INTEGER
    },
    aclaraciones: {
        type: Sequelize.STRING
    }
})

Extra.Empleado = Extra.belongsTo(Empleado, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
})
Extra.Turno = Extra.belongsTo(Turno, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
})
Extra.Puesto = Extra.belongsTo(Puesto, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
})
Extra.Dia = Extra.belongsTo(Dia, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
})
Extra.Local = Extra.belongsTo(Local, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
})


module.exports = Extra;