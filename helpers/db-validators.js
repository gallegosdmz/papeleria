const { User, Category } = require('../models');

// Helpers USER
const existUserEmail = async(email = '') => {
    const searchEmail = await User.findOne({email});

    if (searchEmail) {
        throw new Error(`El email ${email} ya está registrado en la base de datos`);
    }
}

const existUser = async(id = '') => {
    const searchUser = await User.findById(id);

    if (!searchUser) {
        throw new Error(`El usuario ${id}, no existe`);
    }
}

// Helpers CATEGORY
const existCategory = async(id = '') => {
    const searchCategory = await Category.findById(id);

    if (!searchCategory) {
        throw new Error(`La categoria ${id}, no existe`);
    }
}

module.exports = {
    existUserEmail,
    existUser,
    existCategory
}