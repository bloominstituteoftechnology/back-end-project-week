const mongoose = require('mongoose');

const definition = {
    species: {
        type: String,
        required: true,
    },
    latinName: {
        type: String,
        required: true,
    },
        createdOn: {
        type: Date,
        default: Date.now,
    },

}

const options = {
    timestamp: true
}
const bearSchema = new mongoose.Schema(definition, options);

const Bear = mongoose.model('Bear', bearSchema, 'bears');

module.exports = Bear;