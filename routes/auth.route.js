const { Router } = require('express');
const router = Router();
const Client = require('../models/Client')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/registretion',
     [
         check('name', 'Некорректное имя').isLength({min: 2}),
         check('surname', 'Некорректное surname').isLength({min: 5}),
         check('lastname', 'Некорректное lastname').isLength({min: 5}),
         check('login', 'Некорректное login').isLength({min: 5}),
         check('password', 'Некорректное password').isLength({min: 5})
     ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })
            }

            const { name, surname, lastname, phone, login, password } = req.body;

            const isUsed = await Client.findOne({ login })

            if (isUsed) {
                return res.status(300).json({ message: 'Данный логин занят' })
            }

            const hashPassword = await bcrypt.hash(password, 12)

            const user = new Client({
                name, surname, lastname, phone, login, password: hashPassword, comment: ''
            })

            await user.save();

            res.status(201).json({ message: 'Учётная запись созданна' })
        } catch (err) { console.log(err) }
    })

    router.post('/login',
     [
         check('login', 'Некорректное login').exists(),
         check('password', 'Некорректное password').exists()
     ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })
            }

            const {login, password } = req.body;

            const client  = await Client.findOne({login})

            if(!client){
                return res.status(400).json({message: "Такого логина нет"})
            }

            const isMatch = bcrypt.compare(password, client.password)

            if(!isMatch){
                return res.status(400).json({message: 'Пароль не верный'})
            }

            const jwtSecret = 'fdsfds6f78dsfj96dsf54fas8a98778989ada55ccdsd5'

            const token = jwt.sign(
                {clientId: client.id},
                jwtSecret,
                {expiresIn: '1h'}
            )

            res.json({token, clientId: client.id})

        } catch (err) { console.log(err) }
    })



module.exports = router;
