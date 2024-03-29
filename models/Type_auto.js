const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    _id:{type: Types.ObjectId, required: false},
    name: { type: String, required: true },
    price: { type: Number, required: true }
}, { versionKey: false })

module.exports = model('Type_auto', schema)