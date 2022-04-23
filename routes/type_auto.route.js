const {Router} = require('express')
const router = Router()
const Type_auto = require('../models/Type_auto')

router.get('/', async (req, res) => {
    try {
        const type_auto = await Type_auto.find()

        res.json(type_auto)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router