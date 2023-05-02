const { Schema, model } = require('mongoose');

const { CurrentDate } = require('../helpers');

const timeStamp = CurrentDate();

const ProductSchema = Schema({
    name: {
        type: String,
        required: true
    },

    description: {type: String},

    price: {
        type: Number,
        required: true
    },

    stock: {
        type: Number,
        required: true
    },

    available: {
        type: Boolean,
        default: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    estado: {
        type: Boolean,
        default: true
    },

    created_at: {
        type: Date,
        default: timeStamp
    },

    updated_at: {
        type: Date,
        default: timeStamp
    },

    deleted_at: {
        type: Date
    }
});

ProductSchema.methods.toJSON = function() {
    const { __v, _id, ...product } = this.toObject();
    product.uid = _id;

    return product;
}

module.exports = model('Product', ProductSchema);