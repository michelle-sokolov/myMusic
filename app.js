const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// connect to db
mongoose.connect(config.database);

// on connection
mongoose.connection.on('connected', () => {
    console.log('connected to db ', config.database)
});

// check for connection error
mongoose.connection.on('error', (err) => {
    console.log('error connecting ', err)
});

const app = express();

const users = require('./routes/users');

const port = 3000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'client')))

// body parser
app.use(bodyParser.json());

app.use('/users', users);

app.get('/', (req, res) => {
    res.send('hello!')
});

app.listen(port, () => {
    console.log('server started on port ', port);
});