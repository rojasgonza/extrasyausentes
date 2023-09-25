const Usuarios = require('../models/usuarios')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.registrarUsuario = async (req, res) => {
    //leer datos y guardarlos
    const usuario = new Usuarios(req.body)
    usuario.password = await bcrypt.hash(req.body.password, 12)
    try {
        await usuario.save()
        res.json({ mensaje: 'usuario creado' })
    } catch (error) {
        console.log(error);
        res.json({ mensaje: error })

    }
}

exports.iniciarSesion = async (req, res, next) => {
    //buscar
    let condition = { where: { email: req.body.email } }
    const usuario = await Usuarios.findOne(condition)
    if (!usuario) {
        await res.status(401).json({ mensaje: 'usuario no existe' })
        next()
    } else {
        //usuario con mal password
        if (!bcrypt.compareSync(req.body.password, usuario.password)) {
            await res.status(401).json({ mensaje: 'password incorrecto' })
            next()
        } else {
            //correcto
            const token = jwt.sign({
                email: usuario.email,
                password: usuario.password,
                nivel: usuario.nivel,
                nombre: usuario.nombre
            }, 'LLAVESECRETA', {
                expiresIn: '5h'
            })

            //devolver token
            res.json({ token })
        }
    }
}