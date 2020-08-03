const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employees');

dotenv.config({path: './config.env'}); // Content from env file will be loaded into the environment

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // to receive raw json
app.use(employeeRoutes);

let $port = process.env.PORT;
app.listen($port, () => {
    console.log(`App fired up at port ${$port}`);
});
