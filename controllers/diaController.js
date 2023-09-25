const Dia = require('../models/dias')

//nuevo 
exports.nuevoDia = async (req, res, next) => {
    const { nombre } = req.body;
    const dia = await Dia.create({ nombre })
    if (dia) {
        res.json({ mensaje: 'Creado correctamente' })
    } else {
        console.log(error);
    }
}

//mostrar todos
exports.mostrarDias = async (req, res, next) => {
    const dias = await Dia.findAll({})
    if (!dias) {
        console.log(error);
        next()
    }
    res.json(dias)
}

//mostrar 1
exports.mostrarDia = async (req, res, next) => {
    let condition = { where: { id: req.params.idDia } }
    const dia = await Dia.findOne(condition)
    if (!dia) {
        res.json({ mensaje: 'No hay con ese ID' })
        next()
    }
    res.json(dia)
}

//modificar
exports.editarDia = async (req, res, next) => {
    let condition = { where: { id: req.params.idDia } }
    const dia = await Dia.update({
        nombre: req.body.nombre
    }, condition)
    if (!dia) {
        console.log(error);
        next()
    }
    res.json({
        mensaje: 'Editado correctamente'
    })
}

//eliminar
exports.eliminarDia = async (req, res, next) => {
    let condition = { where: { id: req.params.idDia } }
    const dia = await Dia.destroy(condition)
    if (!dia) {
        console.log(error);
        next()
    }
    res.json({
        mensaje: "Borrado correctamente"
    })
}