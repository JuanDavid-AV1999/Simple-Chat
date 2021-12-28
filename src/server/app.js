const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { getBaseDir } = require('../util/index');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));

app.use(express.static(path.join(getBaseDir(__dirname), 'public')));

module.exports = app;