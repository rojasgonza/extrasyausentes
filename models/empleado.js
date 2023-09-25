const Sequelize = require('sequelize')
const db = require('../config/config')

const Empleado = db.define('empleados', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:{
        type: Sequelize.STRING
    },
    apellido:{
        type: Sequelize.STRING
    }
}, {timestamps:false})
module.exports = Empleado