const express = require('express');
const mongoose = require('mongoose')
const http = require("http")
const bodyParser = require('body-parser');
const cors = require('cors');
const socketio = require("socket.io")
const app = express();

const server = http.createServer
require('dotenv/config')
//Middleware 
app.use((req, res, next) => {

    PostSchema.create({
        date: req.date,
        datapoint: Compound_supply_APY_value
    });

})
  
app.use((req, res, next) => {
    let requestTime = Date.now();
    res.on('finish', () => {
        if (req.path === '/analytics') {
            return;
        }

        RequestLog.create({
            url: req.path,
            method: req.method,
            responseTime: (Date.now() - requestTime) / 1000, // convert to seconds
            day: moment(requestTime).format("dddd"),
            hour: moment(requestTime).hour()
        });
    });
    next();
});
app.use(bodyParser.json())

const postsRoute = require('./routes/posts')
app.use('/posts', postsRoute)


app.get('/', (req, res) => {
    // res.send('We are on home');
    res.sendFile(__dirname + "/public/index.html");
    // res.sendFile(__dirname + "/public/css/style.css");
});


//connect to the db

mongoose.connect(process.env.DB_CONNECTION, () => console.log('connected to db'))


app.listen(3000);