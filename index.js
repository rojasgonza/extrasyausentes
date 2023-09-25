const express = require('express')
const bodyParser = require('body-parser')
const db = require('./config/config')
require('dotenv').config({path: '.env'})
const path = require('path');
const Empleado = require('./models/empleado')
const Turno = require('./models/turnos')
const Extra = require('./models/extras')
const Dia = require('./models/dias')
const ValorTurno = require('./models/valor-turno')
const Puesto = require('./models/puesto')
const Local = require('./models/local')

const cors = require('cors')
const routes = require('./routes')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

db.sync()
    .then(() => console.log('conectado'))
    .catch(error => console.log(error))
app.use(cors())

app.use('/', routes())
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3001;
app.listen(port, host, ()=>{
    console.log('el servidor esta funcionando');
})