const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');

const server = require('http').createServer(app);
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

module.exports = {
  server,
  app,
};
