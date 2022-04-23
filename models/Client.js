const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    lastname: {type: String, required: true},
    phone: {type: String, required: true},
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    comment: {type: String}
}, {versionKey: false})

module.exports = model('Client', schema)