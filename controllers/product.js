const { response, request } = require('express');
const { Product } = require('../models');

const { CurrentDate } = require('../helpers');
const timeStamp = CurrentDate();

const getProducts = async(req = request, res = response) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = {estado: true};

        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query),
            Product.updateMany({stock: 0}, {available: false})
            .skip(desde)
            .limit(limite)
        ]);

        res.json({
            total,
            products
        });
    } catch (err) {
        console.log(err);
    }
}



module.exports = {
    getProducts
}