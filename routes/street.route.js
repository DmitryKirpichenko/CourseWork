const { Router } = require('express')
const router = Router()
const Street = require('../models/Street')
const mongoose = require('mongoose')

router.get('/', async (req, res) => {
    try {
        const streets = await Street.find()

        res.status(200).json(streets)
    } catch (error) {
        console.log(error)
    }
})

router.post('/add',
    async (req, res) => {
        try {

            const { name, x, y } = req.body;

            const street = new Street({
                _id: new mongoose.mongo.ObjectId(),
                name,
                x,
                y,
            })

            await street.save();

            res.status(200).json({ message: 'Учётная запись созданна' })
        } catch (err) { console.log(err) }
    })

router.post('/update',

    async (req, res) => {
        try {

            const { streetId, name, x, y } = req.body;

            console.log('update',streetId, name, x, y)

            const street = await Street.findOne({ '_id': streetId })

            if (!street) {
                console.log('No')
                return res.status(300).json({ message: 'Такого заказа нет' })
            }

            street.name = name
            street.x = x
            street.y = y

            await street.save()

            res.status(200).json({ message: 'ЗАпись обновлена' })
        } catch (err) { console.log(err) }
    })

router.post('/delete',

    async (req, res) => {
        try {

            const { streetId} = req.body;

            console.log(streetId)

            const street = await Street.deleteOne({'_id': streetId})


            res.status(200).json({ message: 'ЗАпись удалена' })
        } catch (err) { console.log(err) }
    })


module.exports = router