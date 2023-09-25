const Turno = require('../models/turnos')

//nuevo 
exports.nuevoTurno = async (req, res, next) => {
    const { nombre } = req.body;
    const turno = await Turno.create({ nombre })
    if (turno) {
        res.json({ mensaje: 'Creado correctamente' })
    } else {
        console.log(error);
    }
}

//mostrar todos
exports.mostrarTurnos = async (req, res, next) => {
    const turnos = await Turno.findAll({})
    if (!turnos) {
        console.log(error);
        next()
    }
    res.json(turnos)
}

//mostrar 1
exports.mostrarTurno = async (req, res, next) => {
    let condition = { where: { id: req.params.idTurno } }
    const turno = await Turno.findOne(condition)
    if (!turno) {
        res.json({ mensaje: 'No hay turno con ese ID' })
        next()
    }
    res.json(turno)
}

//modificar
exports.editarTurno = async (req, res, next) => {
    let condition = { where: { id: req.params.idTurno } }
    const turno = await Turno.update({
        nombre: req.body.nombre
    }, condition)
    if (!turno) {
        console.log(error);
        next()
    }
    res.json({
        mensaje: 'Editado correctamente'
    })
}

//eliminar
exports.eliminarTurno = async (req, res, next) => {
    let condition = { where: { id: req.params.idTurno } }
    const turno = await Turno.destroy(condition)
    if (!turno) {
        console.log(error);
        next()
    }
    res.json({
        mensaje: "Turno borrado correctamente"
    })
}