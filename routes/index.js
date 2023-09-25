const express = require('express')
const router = express.Router()
const empleadoController = require('../controllers/empleadoController')
const extraController = require('../controllers/extraController')
const turnoController = require('../controllers/turnoController')
const puestoController = require('../controllers/puestoController')
const diaController = require('../controllers/diaController')
const valortController = require('../controllers/valortController')
const ausenteController = require('../controllers/ausenteController')
const usuariosController = require('../controllers/usuariosController')
const localController = require('../controllers/localController')
const Extra = require('../models/extras')
const db = require('../config/config')
const { Op } = require('sequelize')
const auth = require('../middleware/auth')

module.exports = function () {

    //empleado
    router.post('/nuevo-empleado', empleadoController.nuevoEmpleado)
    router.get('/empleados', auth, empleadoController.mostrarEmpleados)
    router.get('/empleados/:idEmpleado', empleadoController.mostrarEmpleado)
    router.put('/empleados/editar/:idEmpleado', empleadoController.editarEmpleado)
    router.delete('/empleados/eliminar/:idEmpleado', auth, empleadoController.eliminarEmpleado)

    //puestos
    router.post('/puestos',auth, puestoController.nuevoPuesto)
    router.get('/puestos',auth, puestoController.mostrarPuestos)
    router.get('/puestos/:idPuesto',auth, puestoController.mostrarPuesto)
    router.put('/puestos/editar/:idPuesto',auth, puestoController.editarPuesto)
    router.delete('/puestos/eliminar/:idPuesto',auth, puestoController.eliminarPuesto)

    //dias
    router.post('/dias',auth, diaController.nuevoDia)
    router.get('/dias',auth, diaController.mostrarDias)
    router.get('/dias/:idDia',auth, diaController.mostrarDia)
    router.put('/dias/editar/:idDia',auth, diaController.editarDia)
    router.delete('/dias/eliminar/:idDia',auth, diaController.eliminarDia)

    //valor turno
    router.post('/valor-turno',auth, valortController.nuevoValor)
    router.get('/valor-turno',auth, valortController.mostrarValores)
    router.get('/valor-turno/:idValor',auth, valortController.mostrarValor)
    router.put('/valor-turno/editar/:idValor',auth, valortController.editarValor)
    router.delete('/valor-turno/eliminar/:idValor',auth, valortController.eliminarValor)

    //local
    router.post('/local',auth, localController.nuevoLocal)
    router.get('/local',auth, localController.mostrarLocales)
    router.get('/local/:idLocal',auth, localController.mostrarLocal)
    router.put('/local/editar/:idLocal',auth, localController.editarLocal)
    router.delete('/local/eliminar/:idLocal',auth, localController.eliminarLocal)


    //turnos
    router.post('/nuevo-turno',auth, turnoController.nuevoTurno)
    router.get('/turnos',auth, turnoController.mostrarTurnos)
    router.get('/turnos/:idTurno',auth, turnoController.mostrarTurno)
    router.put('/turnos/editar/:idTurno',auth, turnoController.editarTurno)
    router.delete('/turnos/eliminar/:idTurno',auth, turnoController.eliminarTurno)

    //extras
    router.post('/nuevo-extra',auth, extraController.nuevoExtra)
    router.get('/extras',auth, extraController.mostrarExtras)
    router.get('/extras/:idExtra', auth,extraController.mostrarExtra)
    router.put('/extras/editar/:idExtra',auth, extraController.editarExtra)
    router.delete('/extras/eliminar/:idExtra',auth, extraController.eliminarExtra)
    router.get('/obtener-monto',auth, async (req, res) => {
        const { localeId, diaId, turnoId, puestoId } = req.query;
        try {
            const resultadoConsulta = await db.query(
                'SELECT valor FROM valorturnos WHERE localeId = ' + localeId + ' AND diaId = ' + diaId + ' AND turnoId = ' + turnoId + ' AND puestoId = ' + puestoId);

            res.json(resultadoConsulta[0])
        } catch (error) {
            console.error('Error al consultar la base de datos:', error);
            res.status(500).json({ mensaje: 'Error en el servidor.' });
        }
    });
    router.get('/consulta/estado/:estado',auth, extraController.consultaPorEstado)
    router.get('/consulta-saldo-estado/:estado',auth,extraController.consultaSaldo)
    router.get('/sumaMontosPorEmpleadoYEstado/:empleadoId/:estadoId',auth, extraController.sumaMontosPendientesPorEmpleado)
    router.put('/actualizarElementosSeleccionados',auth, async (req, res) => {
        try {
            const { selectedItems, nuevoValor } = req.body;

            // Actualiza los elementos seleccionados en la base de datos usando Sequelize
            await Extra.update(
                { estado: nuevoValor },
                {
                    where: {
                        id: {
                            [Op.in]: selectedItems,
                        },
                    },
                }
            );

            res.status(200).json({ message: 'Elementos seleccionados actualizados con éxito' });
        } catch (error) {
            console.error('Error al actualizar elementos seleccionados', error);
            res.status(500).json({ error: 'Hubo un error al actualizar los elementos seleccionados' });
        }
    });

    //extras por empleados, todos
    router.get('/extras/empleado/:empleadoId',auth, extraController.extrasPorEmpleado)

    //ausentes
    router.post('/nuevo-ausente', auth, ausenteController.nuevoAusente)
    router.get('/ausentes',auth, ausenteController.mostrarAusentes)
    router.get('/ausentes/:idAusente',auth, ausenteController.mostrarAusente)
    router.put('/ausentes/editar/:idAusente',auth, ausenteController.editarAusente)
    router.delete('/ausentes/eliminar/:idAusente',auth, ausenteController.eliminarAusente)


    //usuarios
    router.post('/crear-cuenta', usuariosController.registrarUsuario)
    router.post('/iniciar-sesion', usuariosController.iniciarSesion)
    
    return router
}
