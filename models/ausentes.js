const Sequelize = require('sequelize')
const db = require('../config/config')
const Empleado = require('./empleado')
const Turno = require('./turnos')
const Puesto = require('./puesto')
const Dia = require('./dias')
const Local = require('./local')

const Ausentes = db.define('ausentes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: Sequelize.DATEONLY
    },
    aviso: {
        type: Sequelize.BOOLEAN
    },
    aclaraciones: {
        type: Sequelize.STRING
    }
}, { timestamps: false })
Ausentes.Empleado = Ausentes.belongsTo(Empleado, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
})
Ausentes.Turno = Ausentes.belongsTo(Turno, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
})
Ausentes.Puesto = Ausentes.belongsTo(Puesto, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
})
Ausentes.Dia = Ausentes.belongsTo(Dia, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
})
Ausentes.Local = Ausentes.belongsTo(Local, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

module.exports = Ausentes