const { Router } = require('express')
const router = Router()
const Auto = require('../models/Auto')
const Order = require('../models/Order')
const Client = require('../models/Client')
const Street = require('../models/Street')
const Type_auto = require('../models/Type_auto')
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    try {

        let {type} = req.query

        let autos = await Auto.find({'condition': 0, 'type_auto.name': type}) 


        res.json(autos)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router