const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const { User } = require('../models');

const { generarJWT } = require('../helpers');

const login = async(req = request, res = response) => {
    const {email, password} = req.body;

    try {
        // Verificar si el email existe
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({
                msg: 'El correo no existe'
            });
        }

        // Verificar si el usuario está activo en la base de datos
        if (!user.estado) {
            return res.status(400).json({
                msg: 'Usuario desactivado del sistema'
            });
        }

        // Verficar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Contraeña incorrecta'
            });
        }

        // Generar JWT
        const token = await generarJWT(user.id);

        res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const renovarToken = async(req = request, res = response) => {
    const {user} = req;

    //Generar el JWT
    const token = await generarJWT(user.id);

    res.json({
        user,
        token
    });
}

module.exports = {
    login,
    renovarToken
}