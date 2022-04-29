const { Router } = require('express')
const router = Router()
const Client = require('../models/Client')


router.post('/update',

    async (req, res) => {
        try {

            const { clientId, com } = req.body;

            console.log('comment ', clientId, com)

            const client = await Client.findOne({ '_id': clientId })

            if (!client) {
                console.log('No')
                return res.status(300).json({ message: 'Такого заказа нет' })
            }

            client.comment = com

            await client.save()

            res.status(200).json({ message: 'ЗАпись обновлена' })
        } catch (err) { console.log(err) }
    })
