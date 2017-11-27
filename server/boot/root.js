'use strict';
const express = require('express');
const path = require('path');

module.exports = function(server) {
  var router = server.loopback.Router();
  server.use(router);
  server.use(express.static('client/dist'));
  server.use(express.static('client/public'));

  router.get('/contacts', function(req, res) {
    res.sendFile(path.join(process.cwd() + '/client/dist/index.html'));
  });
  router.get('/events', function(req, res) {
    res.sendFile(path.join(process.cwd() + '/client/dist/index.html'));
  });
  router.get('/settings', function(req, res) {
    res.sendFile(path.join(process.cwd() + '/client/dist/index.html'));
  });
  router.get('/confirm', function(req, res) {
    res.sendFile(path.join(process.cwd() + '/client/dist/index.html'));
  });
};
