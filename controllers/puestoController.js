const Puesto = require('../models/puesto')

//nuevo 
exports.nuevoPuesto = async (req, res, next) => {
    const { nombre } = req.body;
    const puesto = await Puesto.create({ nombre })
    if (puesto) {
        res.json({ mensaje: 'Creado correctamente' })
    } else {
        console.log(error);
    }
}

//mostrar todos
exports.mostrarPuestos = async (req, res, next) => {
    const puestos = await Puesto.findAll({})
    if (!puestos) {
        console.log(error);
        next()
    }
    res.json(puestos)
}

//mostrar 1
exports.mostrarPuesto = async (req, res, next) => {
    let condition = { where: { id: req.params.idPuesto } }
    const puesto = await Puesto.findOne(condition)
    if (!puesto) {
        res.json({ mensaje: 'No hay con ese ID' })
        next()
    }
    res.json(puesto)
}

//modificar
exports.editarPuesto = async (req, res, next) => {
    let condition = { where: { id: req.params.idPuesto } }
    const puesto = await Puesto.update({
        nombre: req.body.nombre
    }, condition)
    if (!puesto) {
        console.log(error);
        next()
    }
    res.json({
        mensaje: 'Editado correctamente'
    })
}

//eliminar
exports.eliminarPuesto = async (req, res, next) => {
    let condition = { where: { id: req.params.idPuesto } }
    const puesto = await Puesto.destroy(condition)
    if (!puesto) {
        console.log(error);
        next()
    }
    res.json({
        mensaje: "Borrado correctamente"
    })
}