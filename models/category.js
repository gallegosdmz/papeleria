const { Schema, model, Types } = require('mongoose');

const { CurrentDate } = require('../helpers');

const timeStamp = CurrentDate();

const CategorySchema = Schema({
    name: {
        type: String,
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

// Sacar __v de la respuesta del POST
CategorySchema.methods.toJSON = function() {
    const { __v, _id, ...category } = this.toObject();
    category.uid = _id;

    return category;
}

module.exports = model('Categorie', CategorySchema);