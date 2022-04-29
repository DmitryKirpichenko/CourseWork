const express = require('express');
const mongoose = require('mongoose')

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json({extended: true}))
app.use('/client', require('./routes/auth.route'))
app.use('/order', require('./routes/order.route'))
app.use('/type_auto', require('./routes/type_auto.route'))
app.use('/street', require('./routes/street.route'))
app.use('/autos', require('./routes/auto.route'))
app.use('/comment', require('./routes/client.route'))

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

module.exports = app