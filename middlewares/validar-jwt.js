const { request, response } = require('express'); 
const jwt = require('jsonwebtoken');
const { User } = require('../models/');

const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Leer el user que corresponde al uid
        const user = await User.findById(uid);
        
        if (!user) {
            return res.status(401).json({
                msg: 'Token no válido - Usuario no existe en BD'
            });
        }

        // Verificar si el uid tiene estado en TRUE
        if (!user.estado) {
            return res.status(401).json({
                msg: 'Token no válido - Usuario con estado: false'
            });
        }

        req.user = user;
        next();
    } catch(err) {
        console.log(err);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
}

module.exports = {
    validarJWT
}