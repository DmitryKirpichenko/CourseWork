const { Router } = require('express')
const router = Router()
const Order = require('../models/Order')
const Client = require('../models/Client')
const Street = require('../models/Street')
const Type_auto = require('../models/Type_auto')
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    try {


        const { clientId, cond, isDriver, isOperator } = req.query

        console.log('Просит по id ', clientId, ' state ', cond, ' driver ', isDriver, ' operator ', isOperator)

        let order

    
        if(isDriver === 'true'){
            order = await Order.find({ 'auto.driver._id':  mongoose.mongo.ObjectId(clientId), 'condition': cond })
            console.log('Просит driver ')

        }
        else{
            if(isOperator === 'true'){
                order = await Order.find()
                console.log('Просит operator ')
            }
            else{
                order = await Order.find({ 'client._id': clientId, 'condition': cond })
                console.log('Просит client ')
            }
        }


        console.log(order)
        res.json(order)
    } catch (error) {
        console.log(error)
    }
})

router.post('/add',

    async (req, res) => {
        try {

            const { clientId, sendStreet1, sendStreet2, sendTypeAuto } = req.body;

            console.log(clientId)
            console.log(sendStreet1)
            console.log(sendStreet2)
            console.log(sendTypeAuto)
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

            const isUsed = await Order.findOne({ 'client._id': clientId, 'condition': 0 })

            if (isUsed) {
                return res.status(300).json({ message: 'У данного пользователя уже есть активный заказ' })
            }
            const client = await Client.findById(clientId)

            console.log(client)

            var date = new Date();


            const order = new Order({
                _id: new mongoose.mongo.ObjectId(),
                data: date.getFullYear.toString(),
                condition: 0,
                price: Math.sqrt((sendStreet1.x - sendStreet2.x)**2 +  (sendStreet1.y - sendStreet2.y)**2) * sendTypeAuto.price,
                client: {
                    _id: client._id,
                    name: client.name,
                    surname: client.surname,
                    lastname: client.lastname,
                    phone: client.phone,
                },
                departure_street: {
                    _id: sendStreet1._id,
                    name: sendStreet1.name,
                    x: sendStreet1.x,
                    y: sendStreet1.y
                },
                destination_street: {
                    _id: sendStreet2._id,
                    name: sendStreet2.name,
                    x: sendStreet2.x,
                    y: sendStreet2.y
                },
                type_auto: {
                    _id: sendTypeAuto._id,
                    name: sendTypeAuto.name,
                    price: sendTypeAuto.price
                },
                auto: null,
                operator: null
            })

            await order.save();

            res.status(201).json({ message: 'Учётная запись созданна' })
        } catch (err) { console.log(err) }
    })



module.exports = router