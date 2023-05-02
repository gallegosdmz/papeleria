const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const { User } = require('../models');
const { CurrentDate } = require('../helpers');

const timeStamp = CurrentDate();

const getUsers = async(req = request, res = response) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = {estado: true};

        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
            .skip(desde)
            .limit(limite)
        ]);

        res.json({
            total,
            users
        });
    } catch (err) {
        console.log(err);
    }
}

const getUser = async(req = request, res = response) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user.estado) {
            return res.status(400).json({
                msg: 'El usuario está eliminado de la BD'
            });
        }

        res.json({
            user
        });
    } catch (err) {
        console.log(err);
    }
}

const createUser = async(req = request, res = response) => {
    try {
        const { estado, password, ...body } = req.body;

        const user = new User({...body});

        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        // Guardar en BD
        await user.save();;

        res.status(201).json({
            user
        });
    } catch (err) {
        console.log(err);
    }
}

const updateUser = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const { estado, password, email, ...body } = req.body;

        const searchUser = await User.findById(id);

        if (email !== searchUser.email) {
            const searchEmail = await User.findOne({email});

            if (searchEmail) {
                return res.status(400).json({
                    msg: `El correo ${correo}, ya lo está usando otro usuario`
                });
            }

            body.email = email;
        }
        
        if (password) {
            // Encriptar contraseña
            const salt = bcryptjs.genSaltSync();
            body.password = bcryptjs.hashSync(password, salt);
        }

        body.updated_at = timeStamp;

        const user = await User.findByIdAndUpdate(id, body, {new: true});

        res.json({
            user
        });
    } catch (err) {
        console.log(err);
    }
}

const deletedUser = async(req = request, res = response) => {
    try {
        const { id } = req.params;

        const data = {
            estado: false,
            deleted_at: timeStamp
        }

        const user = await User.findByIdAndUpdate(id, data, {new: true});

        res.json({
            user
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deletedUser
}