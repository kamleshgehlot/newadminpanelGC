const path = require('path');
const mainRoute = require('express').Router();
const { env } = require("../lib/databaseMySQL");

mainRoute.get('*', (req, res) => {
  if (env === 'prod') {
    const route = path.join(__dirname, '..', 'dist', 'index.html');
    res.sendFile(route);
  } else {
    const route = path.join(__dirname, '..', '..', 'public', 'index.html');
    res.sendFile(route);
  }
});

module.exports = mainRoute;
