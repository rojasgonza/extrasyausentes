const Sequelize = require('sequelize')
const db = require('../config/config')
const Dia = require('./dias')
const Puesto = require('./puesto')
const Turno = require('./turnos')
const Local = require('./local')
const ValorTurno = db.define('valorturnos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    valor: {
        type: Sequelize.DECIMAL(10, 2)
    }
})

ValorTurno.Turno = ValorTurno.belongsTo(Turno, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
})
ValorTurno.Puesto = ValorTurno.belongsTo(Puesto, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
})
ValorTurno.Dia = ValorTurno.belongsTo(Dia, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
})
ValorTurno.Local = ValorTurno.belongsTo(Local, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
})


module.exports = ValorTurno