const {Router} = require('express')
const router = Router()
const Street = require('../models/Street')

router.get('/', async (req, res) => {
    try {
        const streets = await Street.find()

        res.json(streets)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router