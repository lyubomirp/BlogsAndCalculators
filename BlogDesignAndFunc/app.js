const express = require('express');
const config = require('./config/config.js');
const hbs = require('./node_modules/hbs');
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));
const app = express();

require('./config/express')(app, config);
require('./config/passport')();
require('./config/routes')(app);

module.exports = app;
