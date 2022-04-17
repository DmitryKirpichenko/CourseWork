const {Router} = require('express')
const router = Router()
const Order = require('../models/Order')

router.get('/', async (req, res) => {
    try {
        

        const {clientId} = req.query

        console.log('Просит по id ', clientId)

        const order = await Order.find({'client._id': clientId})

        res.json(order)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router