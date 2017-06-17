const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const server = require('http').createServer(app);

module.exports = {
  server,
  app,
};
