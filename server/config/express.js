const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../app/routes');

const app = express();

// Configure two parsers, Content-Type=application/json and Content-Type=x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

// mount all routes on /api path
app.use('/api', routes )

module.exports = app;