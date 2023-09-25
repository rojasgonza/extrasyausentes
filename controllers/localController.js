const Local = require('../models/local')
//nuevo
exports.nuevoLocal = async (req, res, next) => {
    const { nombre } = req.body
    const local = await Local.create({ nombre })
    if (!nombre) {
        console.log(error);
        next()
    }
    res.json({
        mensaje: 'Creado correctamente'
    })
}

//mostrar todos 
exports.mostrarLocales = async (req, res, next) => {
    const locales = await Local.findAll({})
    if (!locales) {
        console.log(error);
        next()
    }
    res.json(locales)
}

//mostrar uno
exports.mostrarLocal = async (req, res, next) => {
    let condition = { where: { id: req.params.idLocal } }
    const local = await Local.findOne(condition)
    if (!local) {
        console.log(error);
        next()
    }
    res.json(local)
}

//editar
exports.editarLocal = async (req, res, next) => {
    let condition = { where: { id: req.params.idLocal } }
    const local = await Local.update({
        nombre: req.body.nombre
    }, condition)
    if (!local) {
        console.log(error);
        next()
    }
    res.json({ mensaje: 'Editado correctamente' })
}

//eliminar
exports.eliminarLocal = async (req, res, next) => {
    let condition = { where: { id: req.params.idLocal } }
    const local = await Local.destroy(condition)
    if(!local){
        console.log(error);
        next()
    }
    res.json({mensaje: 'Eliminado correctamente'})
}