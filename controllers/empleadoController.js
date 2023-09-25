const Empleado = require('../models/empleado')

//nuevo
exports.nuevoEmpleado = async (req, res, next) => {
    const { nombre, apellido } = req.body
    const empleado = await Empleado.create({ nombre, apellido })
    if (!empleado) {
        console.log(error);
        next()
    }
    res.json({ mensaje: 'Empleado creado' })
}

//mostrar todos
exports.mostrarEmpleados = async (req, res, next) => {
    const empleados = await Empleado.findAll({})
    if (!empleados) {
        console.log(error);
        next()
    }
    res.json(empleados)
}

//mostrar uno 
exports.mostrarEmpleado = async (req, res, next) => {
    let condition = { where: { id: req.params.idEmpleado } }
    try {
        const empleado = await Empleado.findOne(condition)
        res.json(empleado)
    } catch (error) {
        console.log(error);
        next()
    }
}

//editar
exports.editarEmpleado = async (req, res, next) => {
    let condition = { where: { id: req.params.idEmpleado } }
    const empleado = await Empleado.update({
        nombre: req.body.nombre,
        apellido: req.body.apellido
    }, condition)
    if (!empleado) {
        console.log(error);
        next()
    }
    res.json({ mensaje: 'Editado corectamente' })
}

//borrar
exports.eliminarEmpleado = async (req, res, next) => {
    let condition = { where: { id: req.params.idEmpleado } }
    const empleado = await Empleado.destroy(condition)
    if (!empleado) {
        console.log(error);
        next()
    }
    res.json({ mensaje: 'Eliminado correctamente' })
}