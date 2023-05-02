const { response, request } = require('express');

const { Category } = require('../models');
const { CurrentDate } = require('../helpers');

const timeStamp = CurrentDate();

const getCategories = async(req = request, res = response) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = {estado: true};

        const [total, categories] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query).populate('user', 'uid name')
            .skip(desde)
            .limit(limite)
        ]);

        res.json({
            total,
            categories
        });
    } catch (err) {
        console.log(err);
    }
}

const getCategory = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id).populate('user', 'uid name');

        if (!category.estado) {
            return res.status(400).json({
                msg: 'La categoria está eliminada de la BD'
            });
        }

        res.json({
            category
        });
    } catch (err) {
        console.log(err);
    }
}

const createCategory = async(req = request, res = response) => {
    try {
        const { estado, ...body } = req.body;
        const data = {
            ...body,
            user: req.user._id
        }

        const category = new Category(data);

        // Guardar en BD
        await category.save();

        res.status(201).json({
            category
        });
    } catch (err) {
        console.log(err);
    }
}

const updateCategory = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const { estado, ...body } = req.body;

        body.updated_at = timeStamp;

        const category = await Category.findByIdAndUpdate(id, body, {new: true});

        res.json({
            category
        });
    } catch (err) {
        console.log(err);
    }
}

const deleteCategory = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const data = {
            estado: false,
            deleted_at: timeStamp
        }

        const category = await Category.findByIdAndUpdate(id, data, {new: true});

        res.json({
            category
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}