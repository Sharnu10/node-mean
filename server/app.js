const express = require('express');
const cors = require('cors');
const logger = require('morgan'); // morgan is a middleware for Node.js and Express applications that is used for logging HTTP requests.
const bodyParser = require('body-parser'); // used to parse the incoming request bodies in HTTP requests. It extracts data from the request body and makes it available under req.body in your Express application
const passport = require('passport'); // Passport is an authentication middleware for Node.js applications. 
const config = require('./config');

const userRoutes = require('./routes/user');

// initialize the app
const app = express();

// middleware
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false})); // When extended is set to false, the querystring library is used, and it does not support nested objects. For example, it will parse the URL-encoded data like name=John&age=25 into { name: 'John', age: '25' }.
// app.use(passport.initialize());
// require('./config/passport')(passport);

// ser routes
app.use(`${config.apiPath}/users`, userRoutes);

module.exports = app;
