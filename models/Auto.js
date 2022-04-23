const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    _id: { type: Types.ObjectId, required: false },
    number: { type: String, required: true },
    brand: { type: String, required: true },
    color: { type: String, required: true },
    year: { type: Number, required: true },
    condition: { type: Number, required: true },
    type_auto: {
        _id: { type: Types.ObjectId, required: false },
        name: { type: String, required: true },
        price: { type: Number, required: true }
    },
    driver: {
        _id: { type: Types.ObjectId, required: false },
        name: { type: String, required: true },
        surname: { type: String, required: true },
        lastname: { type: String, required: true }
    }
}, { versionKey: false })

module.exports = model('Auto', schema)