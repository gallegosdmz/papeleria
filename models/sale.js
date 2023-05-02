const { Schema, model } = require('mongoose');

const { CurrentDate } = require('../helpers');

const timeStamp = CurrentDate();

const SaleSchema = Schema({
    numberSale: {
        type: Number,
        required: true
    },

    subtotal: {
        type: Number,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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

SaleSchema.methods.toJSON = function() {
    const { __v, _id, ...sale } = this.toObject();
    sale.uid = _id;

    return sale;
}

module.exports = model('Sale', SaleSchema);