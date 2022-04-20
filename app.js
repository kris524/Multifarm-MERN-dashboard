const express = require('express');
const mongoose = require('mongoose')
const http = require("http")
const bodyParser = require('body-parser');
const cors = require('cors');
const Compound_supply_APY_value = require('./routes/Compound_function')

const PostSchema = require('./models/Post');

const app = express();
mongoose.connect(process.env.DB_CONNECTION, () => console.log('connected to db'))


require('dotenv/config')
//Middleware 
app.use((req, res, next) => {

    PostSchema.create({
        date: req.date,
        datapoint: Compound_supply_APY_value
    });

})

app.use(bodyParser.json())

const postsRoute = require('./routes/posts');
const req = require('express/lib/request');
app.use('/posts', postsRoute)


app.get('/', (req, res) => {
    // res.send('We are on home');
    res.sendFile(__dirname + "/public/index.html");
    // res.sendFile(__dirname + "/public/css/style.css");
});


app.listen(3000);