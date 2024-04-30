const bodyParser = require("body-parser");
const express = require('express')
const config = require('../config/config')
const app = express();
const telegramRouter = require('./routes/telegramRoutes')

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.use('/telegram', telegramRouter)


const port = config.port
app.listen(port, ()=>{
    console.log("app is connect on port", port)
})




