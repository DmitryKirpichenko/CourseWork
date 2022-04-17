const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    _id:{type: Types.ObjectId, required: false},
    name: { type: String, required: true },
    x: { type: Float32Array, required: true },
    y: { type: Float32Array, required: true }
}, { versionKey: false })

module.exports = model('Street', schema)