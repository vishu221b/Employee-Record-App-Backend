const express = require('express');
const app = express();

const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');

dotenv.config({path: './config.env'}); // Content from env file will be loaded into the environment

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

let $port = process.env.PORT;
app.listen($port, () => {
    console.log(`App fired up at port ${$port}`);
});
