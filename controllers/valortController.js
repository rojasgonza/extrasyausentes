const ValorTurno = require('../models/valor-turno')

//nuevo 
exports.nuevoValor = async (req, res, next) => {
    const { valor, turnoId, puestoId, diaId, localeId } = req.body
    const valorT = await ValorTurno.create({ valor, turnoId, puestoId, diaId, localeId })
    if (!valorT) {
        console.log(error);
        next()
    }
    res.json({ mensaje: 'Creado correctamente' })
}

//mostrar todos
exports.mostrarValores = async (req, res, next) => {
    const valoresT = await ValorTurno.findAll({
        include: [
            { association: ValorTurno.Turno },
            { association: ValorTurno.Dia },
            { association: ValorTurno.Puesto },
            { association: ValorTurno.Local }
        ]
    })
    if (!valoresT) {
        console.log(error);
        next()
    }
    res.json(valoresT)
}

//mostrar uno
exports.mostrarValor = async (req, res, next) => {

    const valorT = await ValorTurno.findOne({
        where: { id: req.params.idValor },
        include: [
            { association: ValorTurno.Turno },
            { association: ValorTurno.Dia },
            { association: ValorTurno.Puesto },
            { association: ValorTurno.Local }
        ]

    })
    if (!valorT) {
        console.log(error);
        next()
    }
    res.json(valorT)
}

//editar
exports.editarValor = async (req, res, next) => {
    let condition = { where: { id: req.params.idValor } }
    const valort = await ValorTurno.update({
        valor: req.body.valor,
        turnoId: req.body.turnoId,
        puestoId: req.body.puestoId,
        diaId: req.body.diaId,
        localeId: req.body.localeId

    }, condition)

    if (!valort) {
        console.log(error);
        next()
    }
    res.json({ mensaje: 'Editado correctamente' })
}

//borrar
exports.eliminarValor = async (req, res, next) => {
    let condition = { where: { id: req.params.idValor } }
    const valort = await ValorTurno.destroy(condition)
    if (!valort) {
        console.log(error);
        next()
    }
    res.json({ mensaje: 'Eliminado correctamente' })
}
