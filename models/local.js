const Sequelize = require('sequelize')
const db = require('../config/config')

const Local = db.define('locales', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING
    }
})

module.exports = Local