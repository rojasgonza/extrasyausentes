const db = require('../config/config');
const Extra = require('../models/extras')
const Local = require('../models/local')
const Turno = require('../models/turnos')
const Empleado = require('../models/empleado')
const Puesto = require('../models/puesto')
const Dia = require('../models/dias')


//nuevo
exports.nuevoExtra = async (req, res, next) => {
    const { monto, fecha, estado, empleadoId, turnoId, puestoId, diaId, aclaraciones } = req.body
    const extra = await Extra.bulkCreate(req.body)
    if (!extra) {
        console.log(error);
        next()
    }
    res.json({
        mensaje: "Extra cargado"
    })
}

//mostrar extras
exports.mostrarExtras = async (req, res, next) => {
    const extras = await Extra.findAll({
        include: [
            { association: Extra.Turno },
            { association: Extra.Dia },
            { association: Extra.Empleado },
            { association: Extra.Puesto },
            { association: Extra.Local }
        ]
    })
    if (!extras) {
        console.log(error);
        next()
    }
    res.json(extras)
}

//mostrar extra
exports.mostrarExtra = async (req, res, next) => {
    const extra = await Extra.findOne({
        where: { id: req.params.idExtra },
        include: [
            { association: Extra.Turno },
            { association: Extra.Dia },
            { association: Extra.Empleado },
            { association: Extra.Puesto },
            { association: Extra.Local }
        ]

    })
    if (!extra) {
        console.log(error);
        next()
    }
    res.json(extra)
}

//modificar 
exports.editarExtra = async (req, res, next) => {
    let condition = { where: { id: req.params.idExtra } }
    const extra = await Extra.update({
        monto: req.body.monto,
        fecha: req.body.fecha,
        empleadoId: req.body.empleadoId,
        turnoId: req.body.turnoId,
        diaId: req.body.diaId,
        puestoId: req.body.puestoId,
        aclaraciones: req.body.aclaraciones,
        estado: req.body.estado
    }, condition)
    if (!extra) {
        console.log(error);
        next()
    }
    res.json({
        mensaje: "Extra modificado correctamente"
    })
}

//borrar
exports.eliminarExtra = async (req, res, next) => {
    let condition = { where: { id: req.params.idExtra } }
    const extra = await Extra.destroy(condition)
    if (!condition) {
        console.log(error);
        next()
    }
    res.json({ mensaje: 'Extra eliminado' })
}

//consulta pendinete 
exports.consultaPorEstado = async (req, res, next) => {
    try {
        const consulta = await Extra.findAll({
            where: { estado: req.params.estado },
            include: [
                { association: Extra.Turno },
                { association: Extra.Dia },
                { association: Extra.Empleado },
                { association: Extra.Local },
                { association: Extra.Puesto }
            ],
        });

        res.json(consulta);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

//extras por empleado
exports.sumaMontosPendientesPorEmpleado = async (req, res, next) => {
    try {
        const { empleadoId, estadoId } = req.params; // Obtén el empleadoId de los parámetros

        const extras = await Extra.findAll({
            where: {
                empleadoId: empleadoId,
                estado: estadoId,
            },
            include: [
                { association: Extra.Turno },
                { association: Extra.Dia },
                { association: Extra.Empleado },
                { association: Extra.Local },
                { association: Extra.Puesto }
            ]
        });

        res.json(extras);
    } catch (error) {
        console.error(error);
        next(error);
    }
};
//extras por empleado
exports.extrasPorEmpleado = async (req, res, next) => {
    try {
        const { empleadoId} = req.params; // Obtén el empleadoId de los parámetros

        const extras = await Extra.findAll({
            where: {
                empleadoId: empleadoId
            },
            include: [
                { association: Extra.Turno },
                { association: Extra.Dia },
                { association: Extra.Empleado },
                { association: Extra.Local },
                { association: Extra.Puesto }
            ]
        });

        res.json(extras);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.consultaSaldo = async (req, res, next) => {
    const consulta = await db.query('SELECT SUM(monto) as total FROM extras WHERE estado = ' + req.params.estado)

    try {
        res.json(consulta[0])
    } catch (error) {
        console.log(error);
        next(error)
    }
}