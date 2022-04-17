const express = require('express');
const mongoose = require('mongoose')

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json({extended: true}))
app.use('/client', require('./routes/auth.route'))
app.use('/order', require('./routes/order.route'))

async function start(){
    try{
        await mongoose.connect('mongodb://localhost:27017/Taxi', { 
            useUnifiedTopology: true, 
            useNewUrlParser: true
        });

        app.listen(PORT, ()=>{
            console.log(`Server run in ${PORT}`)
        })
    }catch(err){console.log(err)}
}

start();