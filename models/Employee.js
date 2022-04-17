const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    _id:{type: Types.ObjectId, required: false},
    name: { type: String, required: true },
    surname: { type: String, required: true },
    lastname: { type: String, required: true },
    salary: { type: String, required: true },
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    licence_number: { type: String }
}, { versionKey: false })

module.exports = model('Employee', schema)