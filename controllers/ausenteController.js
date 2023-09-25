const Ausentes = require('../models/ausentes')

exports.nuevoAusente = async (req, res, next) => {
    const ausente = await Ausentes.bulkCreate(req.body)
    if (!ausente) {
        console.log(error);
        next()
    }
    res.json({ mensaje: 'Ausente cargado' })
}

exports.mostrarAusentes = async (req, res, next) => {
    const ausente = await Ausentes.findAll({
        include: [
            { association: Ausentes.Turno },
            { association: Ausentes.Dia },
            { association: Ausentes.Empleado },
            { association: Ausentes.Puesto },
            { association: Ausentes.Local }
        ]
    })
    if (!ausente) {
        console.log(error);
        next()
    }
    res.json(ausente)
}

exports.mostrarAusente = async (req, res, next) => {
    const ausente = await Ausentes.findOne({
        include: [
            { association: Ausentes.Turno },
            { association: Ausentes.Dia },
            { association: Ausentes.Empleado },
            { association: Ausentes.Puesto },
            { association: Ausentes.Local }
        ]
    }, req.params.idAusente)
    if (!ausente) {
        console.log(error);
        next()
    }
    res.json(ausente)
}

exports.editarAusente = async (req, res, next) => {
    let condition = { where: { id: req.params.idAusente } }

    const ausente = await Ausentes.update({
        fecha: req.body.fecha,
        empleadoId: req.body.empleadoId,
        turnoId: req.body.turnoId,
        diaId: req.body.diaId,
        puestoId: req.body.puestoId,
        aclaraciones: req.body.aclaraciones,
        aviso: req.body.aviso
    }, condition)
    if (!ausente) {
        console.log(error);
        next()
    }
    res.json({ mensaje: "editado" })
}

exports.eliminarAusente = async (req, res, next) => {
    const ausente = await Ausentes.destroy(req.params.idAusente)
    if (!ausente) {
        console.log(error);
        next()
    }
    res.json({ mensaje: 'eliminado ' })
}