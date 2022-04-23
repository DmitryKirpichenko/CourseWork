const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    _id: { type: Types.ObjectId, required: false },
    data: { type: String, required: true },
    condition: { type: Number, required: true },
    price: { type: Number, required: false },
    client: {
        _id: { type: Types.ObjectId, required: false },
        name: { type: String, required: true },
        surname: { type: String, required: true },
        lastname: { type: String, required: true },
        phone: { type: String, required: true},
    },
    departure_street: {
        _id: { type: Types.ObjectId, required: false },
        name: { type: String, required: true },
        x: { type: Number, required: true },
        y: { type: Number, required: true }
    },
    destination_street: {
        _id: { type: Types.ObjectId, required: false },
        name: { type: String, required: true },
        x: { type: Number, required: true },
        y: { type: Number, required: true }
    },
    operator: {type: Object,
        _id: { type: Types.ObjectId, required: false },
        name: { type: String, required: true },
        surname: { type: String, required: true },
        lastname: { type: String, required: true },
        required: false
    },
    type_auto: {
        _id: { type: Types.ObjectId, required: false },
        name: { type: String, required: true }, 
        price: { type: Number, required: true }
    },
    auto: {type: Object,
        _id: { type: Types.ObjectId, required: false },
        number: { type: String, required: true },
        brand: { type: String, required: true },
        color: { type: String, required: true },
        year: { type: Number, required: true },
        condition: { type: Number, required: true },
        driver: {type: Object,
            _id: { type: Types.ObjectId, required: false },
            name: { type: String, required: true },
            surname: { type: String, required: true },
            lastname: { type: String, required: true }
        },
        required:false
    }
})

module.exports = model('Order', schema)