const {Router} = require('express')
const router = Router()
const Order = require('../models/Order')

router.get('/', async (req, res) => {
    try {
        

        const {clientId, cond} = req.query

        console.log('Просит по id ', clientId, ' ', cond)

        const order = await Order.find({'client._id': clientId , 'condition': cond})

        res.json(order)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router